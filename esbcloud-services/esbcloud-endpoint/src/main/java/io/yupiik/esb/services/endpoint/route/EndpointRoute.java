/*
 * Copyright (c) 2023 - Yupiik SAS - https://www.yupiik.com
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 *  http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
package io.yupiik.esb.services.endpoint.route;

import io.yupiik.esb.api.jaxrs.model.Acknowledge;
import io.yupiik.esb.services.endpoint.processor.ResponseProcessor;
import org.apache.camel.Exchange;
import org.apache.camel.builder.RouteBuilder;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;

public class EndpointRoute extends RouteBuilder {

    private static final Logger logger = LoggerFactory.getLogger(EndpointRoute.class);

    private final static String ROUTING_HEADER = "X-Routing-System";

    @Override
    public void configure() {
        onException(Exception.class)
                .handled(true)
                .process(exchange -> {
                    Throwable caused = exchange.getProperty(Exchange.EXCEPTION_CAUGHT, Throwable.class);
                    Acknowledge responseBody = new Acknowledge();
                    responseBody.setStatus(Acknowledge.Status.error);
                    responseBody.setReason(caused.getMessage());

                    Response.ResponseBuilder responseBuilder = Response.ok(
                            responseBody, MediaType.APPLICATION_JSON).status(Response.Status.BAD_REQUEST.getStatusCode());
                    exchange.getMessage().setBody(responseBuilder.build());
                }).end();

        from("cxfrs:{{esbcloud.endpoint.protocol}}://{{esbcloud.endpoint.host}}:{{esbcloud.endpoint.port}}" +
                "?resourceClasses=io.yupiik.esb.api.jaxrs.NotificationApi" +
                "&providers=provider.jackson,provider.exceptionMapper" +
                "&loggingFeatureEnabled={{esbcloud.endpoint.cxf.trace.active}}" +
                "&advanced.bus=cxf.bus")
            .threads()

            .routeId("esbcloud-services-endpoint-route")

            // log exchange headers in debug
            .process(exchange -> {
                exchange.getMessage().getHeaders().forEach((key, value) -> logger.info("Exchange headers :: {} = {}", key, value));
            })

            // send to dedicated route base on http header value
            .choice()
            .when(exchange -> exchange.getIn().hasHeaders()
                    && exchange.getIn().getHeader(ROUTING_HEADER) != null)
                .routingSlip(simple("direct-vm:${header[" + ROUTING_HEADER + "]}"))
            .endChoice().otherwise().end()

            // format http response
            .process(new ResponseProcessor());
    }

}

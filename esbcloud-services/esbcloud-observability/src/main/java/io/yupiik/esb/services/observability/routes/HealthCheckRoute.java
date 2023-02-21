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
package io.yupiik.esb.services.observability.routes;

import org.apache.camel.builder.RouteBuilder;
import org.apache.camel.component.cxf.common.message.CxfConstants;

import javax.ws.rs.BadRequestException;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;

public class HealthCheckRoute extends RouteBuilder {
    @Override
    public void configure() {
        onException(BadRequestException.class).handled(true);
        onException(Exception.class)
                .handled(true)
                .transform()
                .simple("Error reported: ${exception.message}.");

        // expose endpoint
        from("cxfrs:{{esbcloud.observability.healthcheck.protocol}}://{{esbcloud.observability.healthcheck.host}}:{{esbcloud.observability.healthcheck.port}}" +
                "?resourceClasses=io.yupiik.esb.services.observability.api.HealthCheckApi" +
                "&providers=provider.jackson,provider.exceptionMapper" +
                "&advanced.bus=cxf.bus")
            .threads()

            .routeId("esbcloud-observability-healthcheck-route")

            // GET /health/liveness
            .choice()
            .when(exchange -> exchange.getIn().hasHeaders()
                    && exchange.getIn().getHeader(CxfConstants.OPERATION_NAME) != null
                    && exchange.getIn().getHeader(CxfConstants.OPERATION_NAME, String.class).equals("liveness"))
            .process(exchange -> exchange.getMessage().setBody("UP"))
            .endChoice().otherwise().end()

            // GET /health/readiness
            .choice()
            .when(exchange -> exchange.getIn().hasHeaders()
                    && exchange.getIn().getHeader(CxfConstants.OPERATION_NAME) != null
                    && exchange.getIn().getHeader(CxfConstants.OPERATION_NAME, String.class).equals("readiness"))
            .to("bean:io.yupiik.esb.services.observability.component.healthService?method=readiness")
            .process(exchange -> {
                if (exchange.getMessage().getBody().equals("NOT_READY")) {
                    Response.ResponseBuilder responseBuilder = Response.ok(
                            exchange.getMessage().getBody(),
                            MediaType.APPLICATION_JSON).status(Response.Status.PRECONDITION_FAILED.getStatusCode());
                    exchange.getMessage().setBody(responseBuilder.build());
                }
            })
            .endChoice().otherwise().end();
    }

}

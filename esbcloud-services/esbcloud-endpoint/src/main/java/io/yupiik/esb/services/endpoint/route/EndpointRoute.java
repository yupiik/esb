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

import io.yupiik.esb.services.endpoint.processor.ResponseProcessor;
import org.apache.camel.builder.RouteBuilder;

import javax.ws.rs.BadRequestException;

public class EndpointRoute extends RouteBuilder {
    @Override
    public void configure() {
        onException(BadRequestException.class).handled(true);
        onException(Exception.class)
                .handled(true)
                .transform()
                .simple("Error reported: ${exception.message}.");

        from("cxfrs:{{esbcloud.endpoint.protocol}}://{{esbcloud.endpoint.host}}:{{esbcloud.endpoint.port}}" +
                "?resourceClasses=io.yupiik.esb.api.jaxrs.NotificationApi" +
                "&providers=provider.jackson,provider.exceptionMapper" +
                "&loggingFeatureEnabled={{esbcloud.endpoint.cxf.trace.active}}" +
                "&advanced.bus=cxf.bus")
            .threads()

            .routeId("esbcloud-services-endpoint-route")
            .process(new ResponseProcessor());
    }

}

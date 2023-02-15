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
package io.yupiik.esb.routes.route;

import io.yupiik.esb.api.jms.JmsContext;
import org.apache.camel.builder.RouteBuilder;

public class JmsRoute extends RouteBuilder {

    @Override
    public void configure() {
        onException(Exception.class)
                .handled(true)
                .transform()
                .simple("Error reported: ${exception.message}.");

        from("direct-vm:jms")
            .threads()
            .routeId("esbcloud-routes-rest2jms")
            .to(JmsContext.NOTIFICATION_QUEUE.concat("?").concat(JmsContext.PUBLISH_CONFIG));
    }

}

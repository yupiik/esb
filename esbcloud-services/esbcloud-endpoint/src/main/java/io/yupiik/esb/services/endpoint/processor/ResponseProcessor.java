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
package io.yupiik.esb.services.endpoint.processor;

import io.yupiik.esb.api.jaxrs.model.Acknowledge;
import org.apache.camel.Exchange;
import org.apache.camel.Processor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;

public class ResponseProcessor implements Processor {

    private static final Logger logger = LoggerFactory.getLogger(ResponseProcessor.class);

    @Override
    public void process(Exchange exchange) {
        if (logger.isDebugEnabled()) {
            exchange.getMessage().getHeaders().forEach((key, value) -> logger.debug("ResponseProcessor headers :: {} = {}", key, value));
        }

        // set response entity
        Acknowledge responseBody = new Acknowledge();
        responseBody.setStatus(Acknowledge.Status.received);
        responseBody.setReason("Validated");

        // create rest response
        Response.ResponseBuilder responseBuilder = Response.ok(responseBody, MediaType.APPLICATION_JSON).status(Response.Status.OK.getStatusCode());

        Response response = responseBuilder.build();
        exchange.getMessage().setBody(response);
    }
}

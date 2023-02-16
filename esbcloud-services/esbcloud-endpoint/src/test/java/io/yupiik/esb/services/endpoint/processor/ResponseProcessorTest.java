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
import io.yupiik.esb.api.jaxrs.model.Notification;
import org.apache.camel.Exchange;
import org.apache.camel.impl.DefaultCamelContext;
import org.apache.camel.support.DefaultExchange;
import org.junit.jupiter.api.Test;

import javax.ws.rs.core.Response;
import java.util.Properties;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.junit.jupiter.api.Assertions.assertTrue;

public class ResponseProcessorTest {

    @Test
    void testUpdate() {
        ResponseProcessor processor = new ResponseProcessor();

        DefaultCamelContext camelContext = new DefaultCamelContext();
        Properties initProperties = new Properties();
        camelContext.getPropertiesComponent().setInitialProperties(initProperties);
        camelContext.getPropertiesComponent().loadProperties();

        Notification notification = new Notification();
        Exchange exchange = new DefaultExchange(camelContext);
        exchange.getMessage().setBody(notification);
        processor.process(exchange);

        assertNotNull(exchange.getMessage().getBody());
        assertTrue(exchange.getMessage().getBody() instanceof Response);
        Response response = (Response) exchange.getMessage().getBody();

        assertNotNull(response.getEntity());
        assertTrue(response.getEntity() instanceof Acknowledge);
        Acknowledge acknowledge = (Acknowledge) response.getEntity();
        assertEquals(Acknowledge.Status.received, acknowledge.getStatus());
        assertEquals("Validated", acknowledge.getReason());
    }
}

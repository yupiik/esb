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

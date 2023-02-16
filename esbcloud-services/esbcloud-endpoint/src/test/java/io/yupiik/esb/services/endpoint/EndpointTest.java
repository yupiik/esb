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
package io.yupiik.esb.services.endpoint;

import com.fasterxml.jackson.jaxrs.json.JacksonJsonProvider;
import io.restassured.RestAssured;
import io.restassured.http.ContentType;
import io.yupiik.esb.api.jaxrs.model.Notification;
import io.yupiik.esb.services.endpoint.route.EndpointRoute;
import org.apache.camel.CamelContext;
import org.apache.camel.RoutesBuilder;
import org.apache.camel.builder.RouteBuilder;
import org.apache.camel.component.properties.PropertiesComponent;
import org.apache.camel.test.junit5.CamelTestSupport;
import org.junit.jupiter.api.BeforeAll;
import org.junit.jupiter.api.Test;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import javax.jms.JMSException;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import javax.ws.rs.ext.ExceptionMapper;
import java.util.Properties;
import java.util.UUID;

import static io.restassured.RestAssured.given;
import static org.hamcrest.Matchers.equalTo;

class EndpointTest extends CamelTestSupport {

    private static final Logger logger = LoggerFactory.getLogger(EndpointTest.class);
    private final static String PROTOCOL = "http";
    private final static String HOST = "localhost";
    private final static int PORT = 8080;

    @BeforeAll
    public static void before() {
        RestAssured.baseURI = PROTOCOL + "://" + HOST;
        RestAssured.port = PORT;
    }

    @Test
    void testSendNotificationJms() {
        given().accept(ContentType.JSON)
                .with()
                .contentType(ContentType.JSON)
                .header("X-Routing-System", "jms")
                .body(fakeNotification())
                .when()
                .request("POST", "/notification")
                .then()
                .statusCode(200)
                .assertThat()
                .body("status",equalTo("received"));
    }

    @Test
    void testSendNotificationKafka() {
        given().accept(ContentType.JSON)
                .with()
                .contentType(ContentType.JSON)
                .header("X-Routing-System", "kafka")
                .body(fakeNotification())
                .when()
                .request("POST", "/notification")
                .then()
                .statusCode(200)
                .assertThat()
                .body("status",equalTo("received"));;
    }

    @Test
    void testSendNotificationRejected() {
        given().accept(ContentType.JSON)
                .with()
                .contentType(ContentType.JSON)
                .header("X-Routing-System", "unknown")
                .body(fakeNotification())
                .when()
                .request("POST", "/notification")
                .then()
                .statusCode(400)
                .assertThat()
                .body("status",equalTo("error"));;
    }

    @Test
    void testSendNotificationInvalid() {
        given().accept(ContentType.JSON)
                .with()
                .contentType(ContentType.JSON)
                .header("X-Routing-System", "jms")
                .body(fakeNotification())
                .when()
                .request("POST", "/nowhere")
                .then()
                .statusCode(400);
    }

    @Override
    protected RoutesBuilder[] createRouteBuilders() {
        RoutesBuilder[] builder = new RoutesBuilder[3];
        builder[0] = new EndpointRoute();
        builder[1] = new RouteBuilder() {
            @Override
            public void configure() {
                from("direct-vm:jms").log("jms notification received");
            }
        };
        builder[2] = new RouteBuilder() {
            @Override
            public void configure() {
                from("direct-vm:kafka").log("kafka notification received");
            }
        };
        return builder;
    }

    @Override
    protected CamelContext createCamelContext() throws Exception {
        CamelContext camelContext = super.createCamelContext();

        PropertiesComponent propertiesComponent = new PropertiesComponent();
        camelContext.setPropertiesComponent(propertiesComponent);

        Properties initProperties = new Properties();
        initProperties.put("esbcloud.endpoint.host", HOST);
        initProperties.put("esbcloud.endpoint.port", PORT);
        initProperties.put("esbcloud.endpoint.protocol", PROTOCOL);
        initProperties.put("esbcloud.endpoint.cxf.trace.active", true);

        camelContext.getPropertiesComponent().setInitialProperties(initProperties);
        camelContext.getPropertiesComponent().loadProperties();

        camelContext.getRegistry().bind("provider.jackson", new JacksonJsonProvider());
        camelContext.getRegistry().bind("provider.exceptionMapper", (ExceptionMapper<Exception>) throwable -> Response
                .status(Response.Status.BAD_REQUEST)
                .entity(throwable.getMessage())
                .type(MediaType.APPLICATION_JSON)
                .build());

        return camelContext;
    }

    private Notification fakeNotification() {
        Notification notification = new Notification();
        notification.setDate("01/01/2023");
        notification.setReference(UUID.randomUUID().toString());
        notification.setMessage("test message");
        return notification;
    }

}

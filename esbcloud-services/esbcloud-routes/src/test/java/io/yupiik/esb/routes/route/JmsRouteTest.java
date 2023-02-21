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

import io.yupiik.esb.api.jaxrs.model.Notification;
import org.apache.activemq.ActiveMQConnectionFactory;
import org.apache.activemq.broker.BrokerPlugin;
import org.apache.activemq.broker.BrokerService;
import org.apache.activemq.command.ActiveMQQueue;
import org.apache.activemq.plugin.StatisticsBrokerPlugin;
import org.apache.activemq.store.memory.MemoryPersistenceAdapter;
import org.apache.camel.CamelContext;
import org.apache.camel.Exchange;
import org.apache.camel.RoutesBuilder;
import org.apache.camel.component.properties.PropertiesComponent;
import org.apache.camel.support.DefaultExchange;
import org.apache.camel.support.DefaultMessage;
import org.apache.camel.test.junit5.CamelTestSupport;
import org.junit.jupiter.api.AfterAll;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.BeforeAll;
import org.junit.jupiter.api.Test;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import javax.jms.Connection;
import javax.jms.ConnectionFactory;
import javax.jms.ConnectionMetaData;
import javax.jms.JMSException;
import javax.jms.MessageConsumer;
import javax.jms.ObjectMessage;
import javax.jms.Session;
import java.io.IOException;
import java.net.ServerSocket;
import java.util.Properties;
import java.util.UUID;
import java.util.stream.Stream;

class JmsRouteTest extends CamelTestSupport {
    private static String BROKER_URL = "tcp://localhost:";
    private final static String BROKER_QUEUE = "notification";
    private static BrokerService broker;

    @BeforeAll
    public static void before() throws Exception {
        try (final ServerSocket serverSocket = new ServerSocket(0)) {
            BROKER_URL = BROKER_URL.concat(String.valueOf(serverSocket.getLocalPort()));
        } catch (final IOException e) {
            throw new IllegalStateException(e);
        }

        broker =  new BrokerService();
        broker.setPersistenceAdapter(new MemoryPersistenceAdapter());
        broker.setUseJmx(false);
        broker.setBrokerName("esb-test-broker");
        broker.addConnector(BROKER_URL);
        broker.setPlugins(Stream.of(new StatisticsBrokerPlugin()).toArray(BrokerPlugin[]::new));
        broker.start();
    }

    @AfterAll
    public static void after() throws Exception {
        if (broker != null) {
            broker.stop();
        }
    }

    @Test
    void testSendNotificationJms() throws JMSException {
        Exchange sendExchange = new DefaultExchange(this.context);
        sendExchange.setMessage(new DefaultMessage(this.context));
        sendExchange.getMessage().setBody(fakeNotification());
        template.send("direct-vm:jms", sendExchange);

        ActiveMQConnectionFactory connectionFactory = new ActiveMQConnectionFactory(BROKER_URL);
        connectionFactory.setTrustAllPackages(true);

        try (Connection connection = connectionFactory.createConnection()) {
            connection.start();
            ActiveMQQueue activeMQQueue = new ActiveMQQueue(BROKER_QUEUE);
            Session session = connection.createSession(false, Session.CLIENT_ACKNOWLEDGE);
            MessageConsumer consumer = session.createConsumer(activeMQQueue);
            ObjectMessage message = (ObjectMessage) consumer.receive(5L);
            message.acknowledge();
            Notification notificationReceived = (Notification) message.getObject();

            Assertions.assertNotNull(notificationReceived);
            Assertions.assertEquals(sendExchange.getMessage().getBody(Notification.class).getReference(), notificationReceived.getReference());
        }
    }

    @Override
    protected RoutesBuilder[] createRouteBuilders() {
        RoutesBuilder[] builder = new RoutesBuilder[1];
        builder[0] = new JmsRoute();
        return builder;
    }

    @Override
    protected CamelContext createCamelContext() throws Exception {
        final CamelContext camelContext = super.createCamelContext();

        final PropertiesComponent propertiesComponent = new PropertiesComponent();
        camelContext.setPropertiesComponent(propertiesComponent);

        final Properties initProperties = new Properties();
        initProperties.put("gru.routes.event.jms.consumer",
                "&acknowledgementModeName=CLIENT_ACKNOWLEDGE&cacheLevelName=CACHE_CONSUMER&concurrentConsumers=10&maxConcurrentConsumers=10");

        camelContext.getPropertiesComponent().setInitialProperties(initProperties);
        camelContext.getPropertiesComponent().loadProperties();

        final ConnectionFactory connectionFactory = new ActiveMQConnectionFactory(BROKER_URL);
        camelContext.getRegistry().bind("esbConnectionFactory", connectionFactory);

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

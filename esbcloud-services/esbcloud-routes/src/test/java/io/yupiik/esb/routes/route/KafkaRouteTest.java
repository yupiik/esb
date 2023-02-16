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

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.datatype.jsr310.JavaTimeModule;
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
import org.apache.camel.component.kafka.KafkaComponent;
import org.apache.camel.component.kafka.KafkaConfiguration;
import org.apache.camel.component.properties.PropertiesComponent;
import org.apache.camel.support.DefaultExchange;
import org.apache.camel.support.DefaultMessage;
import org.apache.camel.test.junit5.CamelTestSupport;
import org.apache.kafka.clients.consumer.ConsumerConfig;
import org.apache.kafka.clients.consumer.ConsumerRecord;
import org.apache.kafka.clients.consumer.ConsumerRecords;
import org.apache.kafka.clients.consumer.KafkaConsumer;
import org.apache.kafka.clients.producer.KafkaProducer;
import org.apache.kafka.clients.producer.ProducerConfig;
import org.apache.kafka.clients.producer.ProducerRecord;
import org.apache.kafka.common.serialization.StringDeserializer;
import org.apache.kafka.common.serialization.StringSerializer;
import org.junit.jupiter.api.AfterAll;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.BeforeAll;
import org.junit.jupiter.api.MethodOrderer;
import org.junit.jupiter.api.Order;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.TestMethodOrder;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.testcontainers.containers.KafkaContainer;
import org.testcontainers.junit.jupiter.Container;
import org.testcontainers.junit.jupiter.Testcontainers;
import org.testcontainers.utility.DockerImageName;

import javax.jms.Connection;
import javax.jms.ConnectionFactory;
import javax.jms.JMSException;
import javax.jms.MessageConsumer;
import javax.jms.ObjectMessage;
import javax.jms.Session;
import java.io.IOException;
import java.net.ServerSocket;
import java.time.Duration;
import java.util.Collections;
import java.util.HashMap;
import java.util.Map;
import java.util.Properties;
import java.util.UUID;
import java.util.concurrent.ExecutionException;
import java.util.stream.Stream;

import static org.junit.jupiter.api.Assertions.assertEquals;

@Testcontainers
@TestMethodOrder(MethodOrderer.OrderAnnotation.class)
class KafkaRouteTest extends CamelTestSupport {
    private static final Logger logger = LoggerFactory.getLogger(KafkaRouteTest.class);
    private static final String KAFKA_VERSION = "5.4.3";
    private static final String TEST_KAFKA_URI = "direct-vm:kafka";
    private static final String TEST_KAFKA_TOPIC = "dev.esbcloud.notification";

    @Container
    private static final KafkaContainer container_Kafka =
            new KafkaContainer(DockerImageName.parse("confluentinc/cp-kafka").withTag(KAFKA_VERSION)).withReuse(false);

    @Test
    @Order(1)
    void testAllRunning() {
        Assertions.assertTrue(container_Kafka.isRunning());
        logger.info("Kafka infos :: " + container_Kafka.getBootstrapServers());
    }

    @Test
    @Order(2)
    void testKafkaConnection() throws InterruptedException, ExecutionException {

        String topicName = TEST_KAFKA_TOPIC;
        String recordKey = "my.key";
        String recordValue = "any value";

        Map<String, Object> propertiesProducer = createProducerProperties();

        try (final KafkaProducer<String, String> producer = new KafkaProducer<>(propertiesProducer)) {
            producer.send(new ProducerRecord<>(topicName, recordKey, recordValue)).get();
            producer.flush();
        }

        logger.info("Test :: message published, waiting for 2s...");
        Thread.sleep(2000);

        Map<String, Object> propertiesConsumer = createConsumerProperties();

        try (final KafkaConsumer<String, String> consumer = new KafkaConsumer<>(propertiesConsumer)) {
            consumer.subscribe(Collections.singleton(topicName));
            ConsumerRecords<String, String> records = consumer.poll(Duration.ofSeconds(10));
            assertEquals(1, records.count());
            ConsumerRecord<String, String> record = records.iterator().next();
            assertEquals(recordKey, record.key());
            assertEquals(recordValue, record.value());
        }
    }

    @Test
    @Order(3)
    void testKafkaNotification() throws InterruptedException, JsonProcessingException {
        Exchange exchange = new DefaultExchange(this.context);
        exchange.setMessage(new DefaultMessage(this.context));
        Notification sentNotification = fakeNotification();
        exchange.getMessage().setBody(sentNotification);

        template.send(TEST_KAFKA_URI, exchange);

        logger.info("Test :: message published by route, waiting for 2s...");
        Thread.sleep(2L);

        Map<String, Object> propertiesConsumer = createConsumerProperties();

        try (final KafkaConsumer<String, String> consumer = new KafkaConsumer<>(propertiesConsumer)) {
            consumer.subscribe(Collections.singleton(TEST_KAFKA_TOPIC));
            ConsumerRecords<String, String> records = consumer.poll(Duration.ofSeconds(10));
            assertEquals(1, records.count());
            ConsumerRecord<String, String> record = records.iterator().next();
            ObjectMapper mapper = new ObjectMapper();
            mapper.registerModule(new JavaTimeModule());
            final var receivedNotification = mapper.readValue(record.value(), Notification.class);
            assertEquals(sentNotification, receivedNotification);
        }
    }

    @Override
    protected RoutesBuilder[] createRouteBuilders() {
        RoutesBuilder[] builder = new RoutesBuilder[1];
        builder[0] = new KafkaRoute();
        return builder;
    }

    @Override
    protected CamelContext createCamelContext() throws Exception {
        CamelContext camelContext = super.createCamelContext();

        // configure Kafka component
        KafkaConfiguration kafkaConfiguration = new KafkaConfiguration();
        kafkaConfiguration.setBrokers(container_Kafka.getBootstrapServers());
        kafkaConfiguration.setRetries(3);
        KafkaComponent kafkaComponent = new KafkaComponent();
        kafkaComponent.setConfiguration(kafkaConfiguration);
        camelContext.addComponent("kafka", kafkaComponent);

        Properties initProperties = new Properties();
        initProperties.put("esbcloud.kafka.brokers", container_Kafka.getBootstrapServers());
        initProperties.put("esbcloud.kafka.topic", TEST_KAFKA_TOPIC);
        initProperties.put("esbcloud.kafka.consumer.groupid","test");

        camelContext.getPropertiesComponent().setInitialProperties(initProperties);
        camelContext.getPropertiesComponent().loadProperties();

        return camelContext;
    }

    private Notification fakeNotification() {
        Notification notification = new Notification();
        notification.setDate("01/01/2023");
        notification.setReference(UUID.randomUUID().toString());
        notification.setMessage("test message");
        return notification;
    }

    private Map<String, Object> createProducerProperties() {
        Map<String, Object> propertiesProducer = new HashMap<>();
        propertiesProducer.put(ProducerConfig.BOOTSTRAP_SERVERS_CONFIG, container_Kafka.getBootstrapServers());
        propertiesProducer.put(ProducerConfig.CLIENT_ID_CONFIG, "test-client-producer");
        propertiesProducer.put(ProducerConfig.COMPRESSION_TYPE_CONFIG, "none");
        propertiesProducer.put(ProducerConfig.ACKS_CONFIG, "all");
        propertiesProducer.put(ProducerConfig.RETRIES_CONFIG, 0);
        propertiesProducer.put(ProducerConfig.BATCH_SIZE_CONFIG, 16384);
        propertiesProducer.put(ProducerConfig.BUFFER_MEMORY_CONFIG, 33554432);
        propertiesProducer.put(ProducerConfig.KEY_SERIALIZER_CLASS_CONFIG, StringSerializer.class.getName());
        propertiesProducer.put(ProducerConfig.VALUE_SERIALIZER_CLASS_CONFIG, StringSerializer.class.getName());
        propertiesProducer.put(ProducerConfig.REQUEST_TIMEOUT_MS_CONFIG, 5000);
        propertiesProducer.put(ProducerConfig.MAX_REQUEST_SIZE_CONFIG, 2097152);
        return propertiesProducer;
    }

    private Map<String, Object> createConsumerProperties() {
        Map<String, Object> propertiesConsumer = new HashMap<>();
        propertiesConsumer.put(ProducerConfig.BOOTSTRAP_SERVERS_CONFIG, container_Kafka.getBootstrapServers());
        propertiesConsumer.put(ConsumerConfig.CLIENT_ID_CONFIG, "test-client-consumer");
        propertiesConsumer.put(ConsumerConfig.GROUP_ID_CONFIG, "test-consumer");
        propertiesConsumer.put(ConsumerConfig.ENABLE_AUTO_COMMIT_CONFIG, true);
        propertiesConsumer.put(ConsumerConfig.AUTO_COMMIT_INTERVAL_MS_CONFIG, 1000);
        propertiesConsumer.put(ConsumerConfig.SESSION_TIMEOUT_MS_CONFIG, 30000);
        propertiesConsumer.put(ConsumerConfig.MAX_POLL_RECORDS_CONFIG, 1);
        propertiesConsumer.put(ConsumerConfig.KEY_DESERIALIZER_CLASS_CONFIG, StringDeserializer.class.getName());
        propertiesConsumer.put(ConsumerConfig.VALUE_DESERIALIZER_CLASS_CONFIG, StringDeserializer.class.getName());
        propertiesConsumer.put(ConsumerConfig.AUTO_OFFSET_RESET_CONFIG, "earliest"); //latest, earliest, none
        return propertiesConsumer;
    }

}

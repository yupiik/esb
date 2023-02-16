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
package io.yupiik.esb.routes.processor;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.datatype.jsr310.JavaTimeModule;
import io.yupiik.esb.api.jaxrs.model.Notification;
import org.apache.camel.Exchange;
import org.apache.camel.Processor;
import org.apache.camel.component.kafka.KafkaConstants;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.util.UUID;

public class KafkaTransformProcessor implements Processor {
    private static final Logger logger = LoggerFactory.getLogger(KafkaTransformProcessor.class);
    @Override
    public void process(Exchange exchange) {
        if (logger.isDebugEnabled()) {
            exchange.getMessage().getHeaders().forEach((key, value) -> logger.debug("KafkaTransformProcessor headers :: {} = {}", key, value));
        }

        Notification notification = exchange.getMessage(Notification.class);
        ObjectMapper mapper = new ObjectMapper();
        mapper.registerModule(new JavaTimeModule());

        try {
            exchange.getMessage().setBody(mapper.writeValueAsString(notification));
        } catch (JsonProcessingException e) {
            logger.error("error while writing Kafka message from Notification", e);
            exchange.setException(e);
        }
        exchange.getMessage().removeHeaders("*");
        exchange.getMessage().setHeader(KafkaConstants.KEY, UUID.randomUUID().toString());
    }
}

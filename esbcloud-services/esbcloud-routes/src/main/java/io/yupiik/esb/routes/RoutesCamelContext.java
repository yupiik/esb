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
package io.yupiik.esb.routes;

import io.yupiik.esb.routes.route.JmsRoute;
import io.yupiik.esb.routes.route.KafkaRoute;
import org.apache.camel.CamelContext;
import org.apache.camel.component.kafka.KafkaComponent;
import org.apache.camel.component.kafka.KafkaConfiguration;
import org.apache.camel.component.properties.PropertiesComponent;
import org.apache.camel.core.osgi.OsgiDefaultCamelContext;
import org.osgi.framework.ServiceRegistration;
import org.osgi.service.component.ComponentContext;
import org.osgi.service.component.annotations.Activate;
import org.osgi.service.component.annotations.Component;
import org.osgi.service.component.annotations.Deactivate;
import org.osgi.service.component.annotations.Reference;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import javax.jms.ConnectionFactory;
import java.util.Properties;
import java.util.Spliterators;
import java.util.stream.StreamSupport;

@Component(
        name = "io.yupiik.esb.routes.camelcontext",
        immediate = true
)
public class RoutesCamelContext {
    private static final Logger logger = LoggerFactory.getLogger(RoutesCamelContext.class);
    private OsgiDefaultCamelContext camelContext;
    private ServiceRegistration<CamelContext> camelServiceRegistration;
    @Reference(target = "(osgi.jndi.service.name=jms/esb)")
    private ConnectionFactory connectionFactory;

    @Activate
    public void activate(ComponentContext context) throws Exception {
        camelContext = new OsgiDefaultCamelContext(context.getBundleContext());
        camelContext.setName("esbcloud-routes");

        // osgi component property load
        context.getProperties().keys().asIterator().forEachRemaining(key -> logger.info("Camel local property :: {} = {}", key, context.getProperties().get(key)));

        PropertiesComponent propertiesComponent = new PropertiesComponent();
        camelContext.setPropertiesComponent(propertiesComponent);

        // load properties into camel context
        Properties initProperties = new Properties();
        StreamSupport.stream(Spliterators.spliteratorUnknownSize(context.getProperties().keys().asIterator(), 0), false)
                .filter(key -> key.startsWith("esbcloud"))
                .forEach(it -> initProperties.put(it, context.getProperties().get(it).toString()));

        camelContext.getPropertiesComponent().setInitialProperties(initProperties);
        camelContext.getPropertiesComponent().loadProperties();

        // start camel context
        camelContext.start();

        // add jms connection factory into camel registry
        camelContext.getRegistry().bind("esbConnectionFactory", connectionFactory);

        // configure kafka camel component
        KafkaConfiguration kafkaConfiguration = new KafkaConfiguration();
        kafkaConfiguration.setBrokers(camelContext.getPropertiesComponent().resolveProperty("esbcloud.kafka.brokers").orElseThrow());
        kafkaConfiguration.setRetries(3);
        kafkaConfiguration.setSecurityProtocol(camelContext.getPropertiesComponent().resolveProperty("esbcloud.kafka.security.protocol").orElseThrow());
        kafkaConfiguration.setSaslMechanism(camelContext.getPropertiesComponent().resolveProperty("esbcloud.kafka.security.sasl.mechanism").orElseThrow());
        kafkaConfiguration.setSaslJaasConfig(
                camelContext.getPropertiesComponent().resolveProperty("esbcloud.kafka.security.sasl.jaas.module").orElseThrow() + " required " +
                        " username=\"" + camelContext.getPropertiesComponent().resolveProperty("esbcloud.kafka.security.sasl.jaas.username").orElseThrow() + "\"" +
                        " password=\"" + camelContext.getPropertiesComponent().resolveProperty("esbcloud.kafka.security.sasl.jaas.password").orElseThrow() + "\";");

        KafkaComponent kafkaComponent = new KafkaComponent();
        kafkaComponent.setConfiguration(kafkaConfiguration);
        camelContext.addComponent("kafka", kafkaComponent);

        // add camel routes
        camelContext.addRoutes(new JmsRoute());
        camelContext.addRoutes(new KafkaRoute());

        // registering the camel context in the osgi service registry
        camelServiceRegistration = context.getBundleContext().registerService(CamelContext.class, camelContext, null);
    }

    @Deactivate
    public void deactivate() {
        camelServiceRegistration.unregister();
        camelContext.shutdown();
    }

}

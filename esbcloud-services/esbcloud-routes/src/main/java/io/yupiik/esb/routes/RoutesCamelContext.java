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
import org.apache.camel.CamelContext;
import org.apache.camel.component.properties.PropertiesComponent;
import org.apache.camel.core.osgi.OsgiDefaultCamelContext;
import org.apache.camel.spi.ThreadPoolProfile;
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

        context.getProperties().keys().asIterator().forEachRemaining(key -> logger.info("Camel local property :: {} = {}", key, context.getProperties().get(key)));

        PropertiesComponent propertiesComponent = new PropertiesComponent();
        camelContext.setPropertiesComponent(propertiesComponent);

        Properties initProperties = new Properties();
        StreamSupport.stream(Spliterators.spliteratorUnknownSize(context.getProperties().keys().asIterator(), 0), false)
                .filter(key -> key.startsWith("esbcloud"))
                .forEach(it -> initProperties.put(it, context.getProperties().get(it).toString()));

        camelContext.getPropertiesComponent().setInitialProperties(initProperties);
        camelContext.getPropertiesComponent().loadProperties();

        camelContext.start();
        camelContext.getRegistry().bind("esbConnectionFactory", connectionFactory);

        camelContext.addRoutes(new JmsRoute());
        camelServiceRegistration = context.getBundleContext().registerService(CamelContext.class, camelContext, null);
    }

    @Deactivate
    public void deactivate() {
        camelServiceRegistration.unregister();
        camelContext.shutdown();
    }

}

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
package io.yupiik.esb.services.observability;

import com.fasterxml.jackson.jaxrs.json.JacksonJsonProvider;
import io.yupiik.esb.services.observability.component.HealthService;
import io.yupiik.esb.services.observability.routes.HealthCheckRoute;
import io.yupiik.esb.services.observability.utils.LogInInterceptor;
import org.apache.camel.CamelContext;
import org.apache.camel.component.properties.PropertiesComponent;
import org.apache.camel.karaf.core.OsgiDefaultCamelContext;
import org.apache.camel.health.HealthCheckRegistry;
import org.apache.camel.impl.health.DefaultHealthCheckRegistry;
import org.apache.camel.impl.health.RoutesHealthCheckRepository;
import org.apache.cxf.Bus;
import org.apache.cxf.bus.CXFBusFactory;
import org.osgi.framework.ServiceRegistration;
import org.osgi.service.component.ComponentContext;
import org.osgi.service.component.annotations.Activate;
import org.osgi.service.component.annotations.Component;
import org.osgi.service.component.annotations.Deactivate;
import org.osgi.service.component.annotations.Reference;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import javax.ws.rs.ext.ExceptionMapper;
import java.util.Properties;
import java.util.Spliterators;
import java.util.stream.StreamSupport;

@Component(
        name = "io.yupiik.esb.services.observability.camelcontext",
        immediate = true
)
public class ObservabilityCamelContext {
    private static final Logger logger = LoggerFactory.getLogger(ObservabilityCamelContext.class);
    private OsgiDefaultCamelContext camelContext;
    private ServiceRegistration<CamelContext> camelServiceRegistration;
    @Reference
    private HealthService healthService;
    @Activate
    public void activate(ComponentContext context) throws Exception {
        camelContext = new OsgiDefaultCamelContext(context.getBundleContext());

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

        // set cxf bus
        Bus bus = CXFBusFactory.getDefaultBus(true);
        // disable probe request
        bus.getInInterceptors().add(new LogInInterceptor());
        camelContext.getRegistry().bind("cxf.bus", bus);

        // add rest provider and extensions
        camelContext.getRegistry().bind("provider.jackson", new JacksonJsonProvider());
        camelContext.getRegistry().bind("provider.exceptionMapper", (ExceptionMapper<Exception>) throwable -> Response
                .status(Response.Status.BAD_REQUEST)
                .entity(throwable.getMessage())
                .type(MediaType.APPLICATION_JSON)
                .build());

        // add healthservice bean in camel registry
        camelContext.getRegistry().bind("io.yupiik.esb.services.observability.component.healthService", healthService);

        // add camel routes
        camelContext.addRoutes(new HealthCheckRoute());
        camelServiceRegistration = context.getBundleContext().registerService(CamelContext.class, camelContext, null);
    }

    @Deactivate
    public void deactivate() {
        camelServiceRegistration.unregister();
        camelContext.shutdown();
    }

}

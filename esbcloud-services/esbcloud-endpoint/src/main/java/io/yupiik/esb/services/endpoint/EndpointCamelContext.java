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
import io.yupiik.esb.services.endpoint.route.EndpointRoute;
import org.apache.camel.CamelContext;
import org.apache.camel.component.properties.PropertiesComponent;
import org.apache.camel.core.osgi.OsgiDefaultCamelContext;
import org.apache.camel.spi.ThreadPoolProfile;
import org.apache.camel.support.jsse.KeyManagersParameters;
import org.apache.camel.support.jsse.KeyStoreParameters;
import org.apache.cxf.Bus;
import org.apache.cxf.bus.CXFBusFactory;
import org.apache.cxf.configuration.jsse.TLSServerParameters;
import org.apache.cxf.transport.http_jetty.JettyHTTPServerEngineFactory;
import org.osgi.framework.ServiceRegistration;
import org.osgi.service.component.ComponentContext;
import org.osgi.service.component.annotations.Activate;
import org.osgi.service.component.annotations.Component;
import org.osgi.service.component.annotations.Deactivate;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import javax.ws.rs.ext.ExceptionMapper;
import java.util.Properties;
import java.util.Spliterators;
import java.util.stream.StreamSupport;

@Component(
        name = "io.yupiik.esb.services.endpoint.camelcontext",
        immediate = true
)
public class EndpointCamelContext {
    private static final Logger logger = LoggerFactory.getLogger(EndpointCamelContext.class);
    private OsgiDefaultCamelContext camelContext;
    private ServiceRegistration<CamelContext> camelServiceRegistration;

    @Activate
    public void activate(ComponentContext context) throws Exception {
        camelContext = new OsgiDefaultCamelContext(context.getBundleContext());
        camelContext.setName("esbcloud-endpoint");

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

        // set thread pool profile for camel executor
        ThreadPoolProfile profile = camelContext.getExecutorServiceManager().getDefaultThreadPoolProfile();
        profile.setPoolSize(Integer.valueOf(camelContext.getPropertiesComponent().resolveProperty("esbcloud.endpoint.context.thread.min").orElseThrow()));
        profile.setMaxPoolSize(Integer.valueOf(camelContext.getPropertiesComponent().resolveProperty("esbcloud.endpoint.context.thread.max").orElseThrow()));
        profile.setMaxQueueSize(Integer.valueOf(camelContext.getPropertiesComponent().resolveProperty("esbcloud.endpoint.context.queue.max").orElseThrow()));

        // start camel context
        camelContext.start();

        // set cxf default bus
        Bus bus = CXFBusFactory.getDefaultBus(true);
        camelContext.getRegistry().bind("cxf.bus", bus);

        // add rest provider and extensions
        camelContext.getRegistry().bind("provider.jackson", new JacksonJsonProvider());
        camelContext.getRegistry().bind("provider.exceptionMapper", (ExceptionMapper<Exception>) throwable -> Response
                .status(Response.Status.BAD_REQUEST)
                .entity(throwable.getMessage())
                .type(MediaType.APPLICATION_JSON)
                .build());

        // set SSL context with keystore if protocol is https
        if (camelContext.getPropertiesComponent().resolveProperty("esbcloud.endpoint.host").orElse("").equals("https")) {
            KeyStoreParameters keyStoreParameters = new KeyStoreParameters();
            keyStoreParameters.setResource(camelContext.getPropertiesComponent().resolveProperty("esbcloud.endpoint.ssl.keystore").get());
            keyStoreParameters.setPassword(camelContext.getPropertiesComponent().resolveProperty("esbcloud.endpoint.ssl.password").get());
            keyStoreParameters.setType("JKS");
            keyStoreParameters.setCamelContext(camelContext);

            KeyManagersParameters keyManagersParameters = new KeyManagersParameters();
            keyManagersParameters.setKeyStore(keyStoreParameters);
            keyManagersParameters.setKeyPassword(camelContext.getPropertiesComponent().resolveProperty("esbcloud.endpoint.ssl.password").get());
            keyManagersParameters.setCamelContext(camelContext);

            TLSServerParameters tlsServerParameters = new TLSServerParameters();
            tlsServerParameters.setKeyManagers(keyManagersParameters.createKeyManagers());

            JettyHTTPServerEngineFactory jettyHTTPServerEngineFactory = bus.getExtension(JettyHTTPServerEngineFactory.class);
            jettyHTTPServerEngineFactory.setTLSServerParametersForPort(
                    Integer.parseInt(camelContext.getPropertiesComponent().resolveProperty("esbcloud.endpoint.port").get()),
                    tlsServerParameters
            );
        }

        // add camel routes
        camelContext.addRoutes(new EndpointRoute());

        // registering the camel context in the osgi service registry
        camelServiceRegistration = context.getBundleContext().registerService(CamelContext.class, camelContext, null);
    }

    @Deactivate
    public void deactivate() {
        camelServiceRegistration.unregister();
        camelContext.shutdown();
    }

}

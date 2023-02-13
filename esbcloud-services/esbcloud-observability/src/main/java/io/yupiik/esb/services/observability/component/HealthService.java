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
package io.yupiik.esb.services.observability.component;

import io.yupiik.esb.services.observability.model.CamelContextStatus;
import io.yupiik.esb.services.observability.model.ConnectionFactoryStatus;
import org.apache.camel.CamelContext;
import org.apache.camel.health.HealthCheckHelper;
import org.osgi.framework.InvalidSyntaxException;
import org.osgi.framework.ServiceReference;
import org.osgi.service.component.ComponentContext;
import org.osgi.service.component.annotations.Activate;
import org.osgi.service.component.annotations.Component;
import org.osgi.service.component.annotations.Reference;

import javax.jms.Connection;
import javax.jms.ConnectionFactory;
import javax.jms.ConnectionMetaData;
import javax.jms.JMSException;
import java.util.ArrayList;
import java.util.Collection;
import java.util.Collections;
import java.util.Enumeration;
import java.util.Map;
import java.util.Optional;

@Component(
        name = "io.yupiik.esb.services.observability.component.health",
        immediate = true,
        service = HealthService.class
)
public class HealthService {

    private ComponentContext context;

    @Reference(target = "(osgi.jndi.service.name=jms/esb)")
    private ConnectionFactory connectionFactory;

    @Activate
    public void activate(ComponentContext context) {
        this.context = context;
    }

    public Collection<Object> readiness() throws InvalidSyntaxException {
        final Collection<ServiceReference<CamelContext>> camelContexts = context.getBundleContext().getServiceReferences(CamelContext.class, null);
        final Collection<Object> status = new ArrayList<>();
        Optional.ofNullable(camelContexts)
                .orElse(new ArrayList<>())
                .forEach(ctx ->
                        HealthCheckHelper.invokeReadiness(context.getBundleContext().getService(ctx))
                                .forEach(result -> status.add(new CamelContextStatus(result)))
                );
        try {
            final Connection connection = connectionFactory.createConnection();
            connection.start();
            final ConnectionFactoryStatus connectionFactoryStatus = this.buildConnectionFactoryStatus(connection);
            status.add(connectionFactoryStatus);
            connection.close();
        } catch (JMSException e) {
            status.add(this.buildConnectionFactoryStatus(e));
        }
        return status;
    }

    private ConnectionFactoryStatus buildConnectionFactoryStatus(Connection connection) throws JMSException {
        final ConnectionFactoryStatus.Check check = new ConnectionFactoryStatus.Check("osgi.jndi.service.name=jms/esb");
        final ConnectionFactoryStatus state = new ConnectionFactoryStatus()
                .check(check)
                .message("Connection Factory OK")
                .state("UP");
        final ConnectionMetaData metaData = connection.getMetaData();
        state.getMetaData().put("JMSVersion", metaData.getJMSVersion());
        state.getMetaData().put("JMSMajorVersion", metaData.getJMSMajorVersion());
        state.getMetaData().put("JMSMinorVersion", metaData.getJMSMinorVersion());
        state.getMetaData().put("JMSProviderName", metaData.getJMSProviderName());
        state.getMetaData().put("ProviderVersion", metaData.getProviderVersion());
        state.getMetaData().put("ProviderMajorVersion", metaData.getProviderMajorVersion());
        state.getMetaData().put("ProviderMinorVersion", metaData.getProviderMinorVersion());
        final Enumeration<String> jmsxPropertyNames = metaData.getJMSXPropertyNames();
        final StringBuilder jmsxPropertyNamesStr = new StringBuilder();
        Collections.list(jmsxPropertyNames).forEach(o -> jmsxPropertyNamesStr.append(o + " "));
        state.getMetaData().put("JMSXPropertyNames", jmsxPropertyNamesStr);
        return state;
    }

    private ConnectionFactoryStatus buildConnectionFactoryStatus(JMSException exception) {
        final ConnectionFactoryStatus.Check check = new ConnectionFactoryStatus.Check("osgi.jndi.service.name=jms/esb");
        final ConnectionFactoryStatus state = new ConnectionFactoryStatus()
                .check(check)
                .message("Connection Factory KO")
                .state("DOWN");
        final Map<String, Object> metaDataMap = Map.of(
                "JMSExceptionMessage", exception.getMessage(),
                "JMSExceptionCause", exception.getCause().getClass().getName()
        );
        state.setMetaData(metaDataMap);
        return state;
    }
}

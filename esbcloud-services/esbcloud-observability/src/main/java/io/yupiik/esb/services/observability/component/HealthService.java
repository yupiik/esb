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

import org.apache.camel.CamelContext;
import org.apache.camel.health.HealthCheck;
import org.apache.camel.health.HealthCheckHelper;
import org.osgi.framework.InvalidSyntaxException;
import org.osgi.framework.ServiceReference;
import org.osgi.service.component.ComponentContext;
import org.osgi.service.component.annotations.Activate;
import org.osgi.service.component.annotations.Component;
import org.osgi.service.component.annotations.Reference;

import javax.jms.Connection;
import javax.jms.ConnectionFactory;
import javax.jms.JMSException;
import java.util.ArrayList;
import java.util.Collection;
import java.util.Optional;
import java.util.concurrent.atomic.AtomicReference;

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

    public String readiness() throws InvalidSyntaxException {
        final Collection<ServiceReference<CamelContext>> camelContexts = context.getBundleContext().getServiceReferences(CamelContext.class, null);
        AtomicReference<String> readiness = new AtomicReference<>("READY");

        // check camel context
        Optional.ofNullable(camelContexts)
                .orElse(new ArrayList<>())
                .forEach(ctx ->
                        HealthCheckHelper.invokeReadiness(context.getBundleContext().getService(ctx))
                                .forEach(result -> {
                                    if (!result.getState().equals(HealthCheck.State.UP)) readiness.set("NOT_READY");
                                })
                );

        // check jms connection
        try {
            final Connection connection = connectionFactory.createConnection();
            connection.start();
            connection.close();
        } catch (JMSException e) {
            readiness.set("NOT_READY");
        }
        return readiness.get();
    }
}

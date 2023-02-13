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
package io.yupiik.esb.services.observability.utils;

import org.apache.cxf.interceptor.AbstractInDatabindingInterceptor;
import org.apache.cxf.interceptor.Fault;
import org.apache.cxf.message.Message;
import org.apache.cxf.phase.Phase;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import javax.servlet.http.HttpServletRequest;

public class LogInInterceptor extends AbstractInDatabindingInterceptor {
    private static final Logger logger = LoggerFactory.getLogger(LogInInterceptor.class);
    public LogInInterceptor() {
        super(Phase.RECEIVE);
    }
    @Override
    public void handleMessage(Message inMessage) throws Fault {
        // we don't want to log probe request
        if (String.valueOf(inMessage.get("org.apache.cxf.request.uri")).startsWith("/health")) return;

        HttpServletRequest request = (HttpServletRequest) inMessage.get("HTTP.REQUEST");
        StringBuilder headers = new StringBuilder();
        request.getHeaderNames().asIterator().forEachRemaining(
                name -> headers.append(name).append(": ").append(request.getHeader(name)).append(" | "));
        logger.info("AccessLog :: {} {} | {}",
                inMessage.get("org.apache.cxf.request.method"),
                inMessage.get("org.apache.cxf.request.url"),
                headers);
    }
}

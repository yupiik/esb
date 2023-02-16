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
package io.yupiik.esb.services.observability.model;

import com.fasterxml.jackson.annotation.JsonProperty;
import org.apache.camel.health.HealthCheck;

import java.util.HashMap;
import java.util.Map;
import java.util.Optional;

public class CamelContextStatus {
    private Check check = null;
    private HealthCheck.State state = null;
    private Optional<Throwable> error = null;
    private Optional<String> message = null;
    private Map<String, Object> details = new HashMap<>();

    public CamelContextStatus(HealthCheck.Result result) {
        this.setCheck(new Check());
        this.getCheck().setGroup(result.getCheck().getGroup());
        this.getCheck().setId(result.getCheck().getId());
        this.getCheck().setLiveness(result.getCheck().isLiveness());
        this.getCheck().setReadiness(result.getCheck().isReadiness());
        this.getCheck().setMetaData(result.getCheck().getMetaData());
        this.getCheck().setOrder(result.getCheck().getOrder());

        this.setState(result.getState());
        this.setError(result.getError());
        this.setMessage(result.getMessage());
        this.setDetails(result.getDetails());
    }

    @JsonProperty("check")
    public Check getCheck() {
        return check;
    }

    public void setCheck(Check id) {
        this.check = id;
    }

    public CamelContextStatus check(Check check) {
        this.check = check;
        return this;
    }

    @JsonProperty("state")
    public HealthCheck.State getState() {
        return state;
    }

    public void setState(HealthCheck.State state) {
        this.state = state;
    }

    public CamelContextStatus state(HealthCheck.State state) {
        this.state = state;
        return this;
    }

    @JsonProperty("message")
    public Optional<String> getMessage() {
        return message;
    }

    public void setMessage(Optional<String> message) {
        this.message = message;
    }

    public CamelContextStatus message(Optional<String> message) {
        this.message = message;
        return this;
    }

    @JsonProperty("error")
    public Optional<Throwable> getError() {
        return error;
    }

    public void setError(Optional<Throwable> error) {
        this.error = error;
    }

    public CamelContextStatus error(Optional<Throwable> error) {
        this.error = error;
        return this;
    }

    @JsonProperty("details")
    public Map getDetails() {
        return details;
    }

    public void setDetails(Map details) {
        this.details = details;
    }

    public CamelContextStatus metaData(Map metaData) {
        this.details = metaData;
        return this;
    }

    public class Check {
        private String group = null;
        private String id = null;
        //private HealthCheckConfiguration configuration = null;
        private boolean liveness = false;
        private boolean readiness = false;
        Map<String, Object> metaData;
        Integer order;

        public String getGroup() {
            return group;
        }

        public void setGroup(String group) {
            this.group = group;
        }

        public String getId() {
            return id;
        }

        public void setId(String id) {
            this.id = id;
        }

        public boolean isLiveness() {
            return liveness;
        }

        public void setLiveness(boolean liveness) {
            this.liveness = liveness;
        }

        public boolean isReadiness() {
            return readiness;
        }

        public void setReadiness(boolean readiness) {
            this.readiness = readiness;
        }

        public Map<String, Object> getMetaData() {
            return metaData;
        }

        public void setMetaData(Map<String, Object> metaData) {
            this.metaData = metaData;
        }

        public Integer getOrder() {
            return order;
        }

        public void setOrder(Integer order) {
            this.order = order;
        }
    }
}

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

import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonProperty;

import java.util.HashMap;
import java.util.Map;

@JsonInclude(JsonInclude.Include.NON_NULL)
public class ConnectionFactoryStatus {
    private Check check = null;
    private String state = null;
    private String message = null;
    private Map<String, Object> metaData = new HashMap<>();

    @JsonProperty("check")
    public Check getCheck() {
        return check;
    }

    public void setCheck(Check check) {
        this.check = check;
    }

    public ConnectionFactoryStatus check(Check check) {
        this.check = check;
        return this;
    }

    @JsonProperty("state")
    public String getState() {
        return state;
    }

    public void setState(String state) {
        this.state = state;
    }

    public ConnectionFactoryStatus state(String state) {
        this.state = state;
        return this;
    }

    @JsonProperty("message")
    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    public ConnectionFactoryStatus message(String message) {
        this.message = message;
        return this;
    }

    @JsonProperty("metaData")
    public Map getMetaData() {
        return metaData;
    }

    public void setMetaData(Map metaData) {
        this.metaData = metaData;
    }

    public ConnectionFactoryStatus metaData(Map metaData) {
        this.metaData = metaData;
        return this;
    }

    public static class Check {
        private String id;
        public Check(String id) {
            this.id = id;
        }

        public String getId() {
            return id;
        }

        public void setId(String id) {
            this.id = id;
        }
    }
}

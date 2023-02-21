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
package io.yupiik.esb.api.jaxrs.model;

import com.fasterxml.jackson.annotation.JsonProperty;

import javax.validation.Valid;
import java.io.Serializable;
import java.util.Objects;

public class Notification implements Serializable {

    private @Valid String reference = null;
    private @Valid String date = null;
    private @Valid String message = null;

    /**
     * The external reference id of the notification
     **/
    public Notification reference(String reference) {
        this.reference = reference;
        return this;
    }

    @JsonProperty("reference")
    public String getReference() {
        return reference;
    }

    public void setReference(String reference) {
        this.reference = reference;
    }

    /**
     * The date of the notification on timestamp format 01/01/1970 00:00:00 GMT (in millisecond)
     **/
    public Notification date(String date) {
        this.date = date;
        return this;
    }

    @JsonProperty("date")
    public String getDate() {
        return date;
    }

    public void setDate(String date) {
        this.date = date;
    }

    /**
     * The text message of the notification
     **/
    public Notification message(String message) {
        this.message = message;
        return this;
    }

    @JsonProperty("message")
    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    @Override
    public boolean equals(java.lang.Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }
        Notification notification = (Notification) o;
        return Objects.equals(reference, notification.reference) &&
                Objects.equals(date, notification.date) &&
                Objects.equals(message, notification.message);
    }

    @Override
    public int hashCode() {
        return Objects.hash(reference, date, message);
    }

    @Override
    public String toString() {
        StringBuilder sb = new StringBuilder();
        sb.append("class Notification {\n");

        sb.append("    reference: ").append(toIndentedString(reference)).append("\n");
        sb.append("    date: ").append(toIndentedString(date)).append("\n");
        sb.append("    message: ").append(toIndentedString(message)).append("\n");
        sb.append("}");
        return sb.toString();
    }

    /**
     * Convert the given object to string with each line indented by 4 spaces
     * (except the first line).
     */
    private String toIndentedString(java.lang.Object o) {
        if (o == null) {
            return "null";
        }
        return o.toString().replace("\n", "\n    ");
    }
}

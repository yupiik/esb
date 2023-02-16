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
package e2e;

import io.cucumber.java.en.Given;
import io.cucumber.java.en.Then;
import io.cucumber.java.en.When;
import io.restassured.RestAssured;
import io.restassured.http.ContentType;
import io.restassured.response.Response;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.util.Optional;

import static io.restassured.RestAssured.given;
import static org.hamcrest.core.IsEqual.equalTo;

public class E2ESteps {
    private static String jsonFile;
    private static Response response;
    public E2ESteps() {
        super();
        defineBaseHttpUrl();
    }
    private void defineBaseHttpUrl() {
        /* E2E_BASE_URL will be provided automatically by CI pipeline */
        RestAssured.baseURI = Optional.ofNullable(System.getenv("E2E_BASE_URL")).orElse("http://localhost:8080");
    }

    @Given("Le fichier json à utiliser est {string}")
    public void setJsonFile(String jsonFile) throws IOException {
        E2ESteps.jsonFile = new String(Files.readAllBytes(Paths.get("src/test/resources/sample/" + jsonFile)));
    }

    @When("J'envoie une notification de type {string}")
    public void sendNotification(String type) {
        E2ESteps.response = given()
                    .when()
                    .accept(ContentType.JSON)
                    .contentType(ContentType.JSON)
                    .header("X-Routing-System", type)
                    .body(jsonFile)
                    .post("/notification");
    }

    @Then("Le statut http de la réponse est {int}")
    public void returnHttpStatus(int code) {
        E2ESteps.response.then().statusCode(code);
    }

    @Then("Le statut de la demande est {string}")
    public void returnHttpResponse(String state) {
        E2ESteps.response.then().assertThat().body("status", equalTo(state));
    }

}

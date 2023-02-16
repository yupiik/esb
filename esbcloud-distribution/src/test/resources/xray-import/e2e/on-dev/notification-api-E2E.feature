@NOTIFJIRAPROJECT-1
Feature: Validation de la création d'une notification
  Le but est de vérifier que l'api créée une notification après l'avoir reçu.

  @NOTIFJIRAPROJECT-2
  Scenario Outline: Création d'une notification
    Given Le fichier json à utiliser est <jsonFile>
    When J'envoie une notification de type <type>
    Then Le statut http de la réponse est <code>
    And Le statut de la demande est <state>
    Examples:
      | jsonFile            | type      | code | state      |
      | "notification.json" | "jms"     | 200  | "received" |
      | "notification.json" | "kafka"   | 200  | "received" |
      | "notification.json" | "unknown" | 400  | "error"    |

Feature: Validación de Datos Duplicados en Solicitud de Recogida

  Scenario: Validación de documento duplicado en solicitud
    Given un servicio de solicitud de recogida
    And el usuario configura el documento como "1036149001"
    When el usuario envía la solicitud de recogida con un documento duplicado
    Then el código de respuesta debe ser 200
    And el servicio debe responder con un mensaje de error indicando "Error, Ya existe una recogida programada para hoy, id: 26781253"
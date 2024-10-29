Feature: Validación de Fecha de Recogida
  Scenario: Enviar un formato incorrecto en el campo "Fecha de Recogida"
    Given un servicio de solicitud de recogida
    When el usuario envía una fecha de recogida en formato incorrecto "01-11-2040"
    Then el código de respuesta debe ser 200
    And el servicio debe responder con un mensaje de error indicando "Error, Ya existe una recogida programada para hoy, id: 26780647"
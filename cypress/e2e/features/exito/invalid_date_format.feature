Feature: Validación de Fecha de Recogida

  Scenario: Enviar un formato incorrecto en el campo "Fecha de Recogida"
    Given un servicio de solicitud de recogida
    When el usuario envía una fecha de recogida en formato incorrecto "01-11-2040"
    Then el servicio debe responder con un mensaje de error indicando "El campo fecha debe ser diferente de vacio y debe tener un formato valido."
    And el código de respuesta debe ser 200

Feature: Validación de Formato de Correo Electrónico

  Scenario: Enviar un correo electrónico en formato incorrecto
    Given un servicio de solicitud de recogida
    When el usuario envía un correo electrónico con formato incorrecto "santiago.hernandezgmail.com"
    Then el servicio debe responder con un mensaje de error indicando "Los valores de entrada no son correctos."
    And el código de respuesta debe ser 400

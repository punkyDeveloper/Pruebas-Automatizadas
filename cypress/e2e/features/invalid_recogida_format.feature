Feature: Recogida fuera del rango

  Scenario: enviar un fecha mayor a el rango de recogida
    Given un servicio de solicitud de recogida
    When el usuario envía una fecha de recogida en formato incorrecto "2024-11-30"
    Then el servicio debe responder con un mensaje de error indicando "El campo fecha: 30-11-2024, no debe ser mayor a la fecha: 04-11-2024"
    And el código de respuesta debe ser 200

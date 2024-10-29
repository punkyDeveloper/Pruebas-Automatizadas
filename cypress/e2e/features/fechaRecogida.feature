Feature: Validación de Días Hábiles en Solicitud de Recogida

  Scenario: Validación de día hábil para la fecha de recogida
    Given un servicio de solicitud de recogida
    And el usuario configura la fecha de recogida como "2024-11-30"
    When el usuario envía la solicitud de recogida
    And el servicio responde con el código 400



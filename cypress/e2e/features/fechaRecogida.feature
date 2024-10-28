Feature: Validación de Días Hábiles en Solicitud de Recogida

  Scenario: Validación de día hábil para la fecha de recogida
    Given el usuario configura la fecha de recogida como "2024-11-02"
    When el usuario envía la solicitud de recogida
    Then el servicio responde con el código 200
    And el mensaje de éxito es "Solicitud recogida programada exitosamente"

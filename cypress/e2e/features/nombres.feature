Feature: Validación de Caracteres en los Campos de Solicitud

  Scenario: Validación de caracteres alfanuméricos en el campo de nombre
    Given el usuario configura el nombre como "Santiago123"
    When el usuario envía la solicitud de recogida
    Then el código de respuesta debe ser 200
    And el mensaje es "Solicitud recogida programada exitosamente"
Feature: Validación de Datos Duplicados en Solicitud de Recogida

  Scenario: Validación de documento duplicado en solicitud
    Given el usuario configura el documento como "1036149001"
    When el usuario envía la solicitud de recogida con un documento duplicado
    Then el servicio responde con el código 200 indicando duplicado
    And el mensaje es "Error, Ya existe una recogida programada para hoy, id: 26780714"
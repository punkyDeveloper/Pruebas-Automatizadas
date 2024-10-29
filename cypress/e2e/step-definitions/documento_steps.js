import { Given, When, Then } from 'cypress-cucumber-preprocessor/steps';

// Paso para inicializar el servicio de solicitud de recogida
Given('un servicio de solicitud de recogida', function () {
  this.requestData = {
    "tipoEnvio": "1",
    "tipoProducto": "4",
    "indicativo": "57",
    "tipoDocumento": "13",
    "email": "ana@gmail.com",
    "personaEntrega": "1",
    "indicativoEntrega": "57",
    "medidasAproximadas": [
      {
        "id": 2,
        "tipoPaq": "Par de zapatos",
        "nombrePaq": "Par de za...",
        "cantidad": 1
      }
    ],
    "ciudad": "Envigado (Ant)",
    "via": "",
    "numero": "",
    "detalle": "PARQUE SAN JOSE BOD 14",
    "tipoVia": 16,
    "nombres": "Santiago",
    "apellidos": "Hernandez",
    "documento": "", 
    "celular": "3005777777",
    "ciudadDetalle": {
      "nombre_terminal_operativa": "Medellin",
      "tipo_servicio": "A",
      "dane_ciudad": "05266",
      "dane_actual": "05266000",
      "ciudad_tarifa": "05266000",
      "sms": true,
      "cubre_mqp": true,
      "codigo_postal": "055428",
      "terminal_operativa": 2,
      "cubre_me": true,
      "area_telefono": 4,
      "observaciones2": "FCE - RD - FD - RCE",
      "codigo": "05266000",
      "tipo_poblacion": "D",
      "activo": true,
      "codigo_terminal": 2,
      "codigo_interno": 204,
      "mensajeria": true,
      "cubre_mm": false,
      "departamento": "05",
      "cubre_cm": false,
      "nombre": "Envigado (Ant)",
      "abreviado": "ENVIGADO",
      "nombre_terminal": "Medellin",
      "observaciones": ""
    },
    "direccion": "Cl 10 # 20 30",
    "fechaRecogida": "",
    "nombreEntrega": "prueba",
    "apellidosEntrega": "prueba1",
    "celularEntrega": "3045677777",
    "emailUsuario": "anar.7@gmail.com",
    "descripcionTipoVia": "Kilómetro",
    "aplicativo": "envios"
  };
});

// Paso para configurar el documento como 1036149001
Given('el usuario configura el documento como {string}', function (documento) {
  this.requestData.documento = documento; 
});

When('el usuario envía la solicitud de recogida con un documento duplicado', function () {
  cy.request({
    method: "POST",
    url: "https://apiv2-test.coordinadora.com/recogidas/cm-solicitud-recogidas-ms/solicitud-recogida",
    body: this.requestData,
    failOnStatusCode: false,
    headers: { 'Content-Type': 'application/json' }
  }).then((response) => {
    this.responseStatus = response.status;
    this.responseData = response.body;

    // Logs para depuración
    cy.log("Response Status:", this.responseStatus);
    cy.log("Response Data:", JSON.stringify(this.responseData));
  });
});

Then("el mensaje es {string}", function (mensajeEsperado) {
  expect(this.responseData).to.exist; 
  expect(this.responseData.isError).to.be.true;
  expect(this.responseData.data.message).to.include(mensajeEsperado); 
  expect(this.responseData.data.recogida_anterior).to.be.true; 
});


Then('el código de respuesta debe ser {int}', function (codigoEsperado) {
    expect(this.responseStatus).to.exist;
    expect(this.responseStatus).to.equal(codigoEsperado);
  });

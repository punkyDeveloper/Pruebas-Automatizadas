import { Given, When, Then } from 'cypress-cucumber-preprocessor/steps';

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
      "documento": "1036149001",
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
      "fechaRecogida": "01-11-2040",
      "nombreEntrega": "prueba",
      "apellidosEntrega": "prueba1",
      "celularEntrega": "3045677777",
      "emailUsuario": "anar.7@gmail.com",
      "descripcionTipoVia": "Kilómetro",
      "aplicativo": "envios"
      
  };
});

When('el usuario envía una fecha de recogida en formato incorrecto {string}', async function (fechaIncorrecta) {
  this.requestData.fechaRecogida = fechaIncorrecta;

  cy.request({
    method: 'POST',
    url: 'https://apiv2-test.coordinadora.com/recogidas/cm-solicitud-recogidas-ms/solicitud-recogida',
    body: this.requestData,
    failOnStatusCode: false,
    headers: { 'Content-Type': 'application/json' }
  }).then((response) => {
    this.responseStatus = response.status;
    this.responseData = response.body;
  
    // Agregar para depuración
    console.log("Response Status:", this.responseStatus);
    console.log("Response Data:", this.responseData);
  });
});

Then('el servicio debe responder con un mensaje de error indicando {string}', function (mensajeEsperado) {
  expect(this.responseData).to.exist; // Asegúrate de que existe
  expect(this.responseData.data.message).to.include(mensajeEsperado); // Cambié el path para ajustarlo a la estructura mostrada en la imagen
  expect(this.responseData.data.recogida_anterior).to.be.true; // Validar que el campo recogida_anterior también sea true
});



Then('el código de respuesta debe ser {int}', function (codigoEsperado) {
  expect(this.responseStatus).to.exist; // Asegúrate de que existe
  expect(this.responseStatus).to.equal(codigoEsperado);
});

import { Given, When, Then } from 'cypress-cucumber-preprocessor/steps';

Given('un servicio de solicitud de recogida', function () {
  this.requestData = {
    
"tipoEnvio": "1",
"tipoProducto": "4",
"indicativo": "57",
"tipoDocumento": "13",
"email": "santiago.hernandezgmail.com",
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
"direccion": "Cl 11 # 20 30",
"fechaRecogida": "2024-11-02",
"nombreEntrega": "prueba",
"apellidosEntrega": "prueba1",
"celularEntrega": "3045677777",
"emailUsuario": "santiago.hernandezgmail.com",
"descripcionTipoVia": "Kilómetro",
"aplicativo": "envios"
  };
});

When('el usuario envía un correo electrónico con formato incorrecto {string}', async function (emailIncorrecto) {
  this.requestData.email = emailIncorrecto;

  const response = await fetch('https://apiv2-test.coordinadora.com/recogidas/cm-solicitud-recogidas-ms/solicitud-recogida', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(this.requestData),
  });

  this.responseStatus = response.status;
  this.responseData = await response.json();
});

Then('el servicio debe responder con un mensaje de error indicando {string}', function (mensajeEsperado) {
  expect(this.responseData.message).to.include(mensajeEsperado);
});

Then('el código de respuesta debe ser 400', function () {
  expect(this.responseStatus).to.equal(400);
});

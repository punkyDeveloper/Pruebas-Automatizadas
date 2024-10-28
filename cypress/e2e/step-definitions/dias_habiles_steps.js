// dias_habiles_steps.js

import { Given, When, Then } from "cypress-cucumber-preprocessor/steps";

const jsonSolicitud = {
    
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
    "direccion": "Cl 10 # 20 831",
    "fechaRecogida": "2024-11-02",
    "nombreEntrega": "Santiago123",
    "apellidosEntrega": "prueba1",
    "celularEntrega": "3045677777",
    "emailUsuario": "Santiago.7@gmail.com",
    "descripcionTipoVia": "Kilómetro",
    "aplicativo": "envios"
    

};

Given("el usuario configura la fecha de recogida como {string}", (fecha) => {
    jsonSolicitud.fechaRecogida = fecha;
  });
  
  When("el usuario envía la solicitud de recogida", () => {
    cy.request({
      method: "POST",
      url: "https://apiv2-test.coordinadora.com/recogidas/cm-solicitud-recogidas-ms/solicitud-recogida",
      body: jsonSolicitud,
      failOnStatusCode: false,
    }).as("solicitudRecogida");
  });
  
  Then("el servicio responde con el código {int}", (statusCode) => {
    cy.get("@solicitudRecogida").then((response) => {
      expect(response.status).to.eq(statusCode);
    });
  });
  
  Then("el mensaje de éxito es {string}", (mensaje) => {
    cy.log(mensaje)
    cy.get("@solicitudRecogida").then((response) => {
        // Verificamos que la respuesta contenga lo que necesitamos
        expect(response.body).to.have.property('data');
        expect(response.body.data).to.have.property('id_recogida');
        expect(response.body.data.id_recogida).to.have.property('message');
        expect(response.body.data.id_recogida.message).to.eq(mensaje);
    });
});
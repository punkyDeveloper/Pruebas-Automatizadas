import { Given, When, Then } from "cypress-cucumber-preprocessor/steps";

const jsonSolicitudBase = {
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
    "direccion": "Cl 10 # 20 0",
    "fechaRecogida": "2024-11-02",
    "nombreEntrega": "Santiago123",
    "apellidosEntrega": "prueba1",
    "celularEntrega": "3045677777",
    "emailUsuario": "Santiago.7@gmail.com",
    "descripcionTipoVia": "Kilómetro",
    "aplicativo": "envios"
};

Given("el usuario configura el documento como {string}", (documento) => {
    const jsonSolicitud = { ...jsonSolicitudBase, documento };
    cy.wrap(jsonSolicitud).as("jsonSolicitud");
});

When("el usuario envía la solicitud de recogida con un documento duplicado", () => {
    cy.get("@jsonSolicitud").then((jsonSolicitud) => {
        cy.request({
            method: "POST",
            url: "https://apiv2-test.coordinadora.com/recogidas/cm-solicitud-recogidas-ms/solicitud-recogida",
            body: jsonSolicitud,
            failOnStatusCode: false,
        }).as("solicitudAlfanumerica");
    });
});

Then("el servicio responde con el código {int} indicando duplicado", (statusCode) => {
    cy.get("@solicitudAlfanumerica").then((response) => {
        cy.log(JSON.stringify(response.body)); 
        expect(response.status).to.eq(statusCode);
    });
});

Then("el mensaje es {string}", (mensaje) => {
    cy.get("@solicitudAlfanumerica").then((response) => {
        cy.log("hola"); 
        cy.log(JSON.stringify(response.body)); 
        expect(response.body.data.message).to.eq(mensaje); // Verificación del mensaje
    });
});
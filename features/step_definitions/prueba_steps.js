const { Given, When, Then } = require('@cucumber/cucumber');
const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../../app');  // Asegúrate de que este archivo exporte tu aplicación Express
const { expect } = chai;
use(chaiHttp);

let clienteData = {};
let response;



Given('que tengo un cliente con los siguientes datos', function (dataTable) {
    clienteData = dataTable.rowsHash();
});

When('envío una solicitud POST a /clientes', async function () {
  response = await request(app)
    .post('/clientes')
    .send(clienteData);
});

Then('la respuesta debe ser {int} OK', function (statusCode) {
  expect(response).to.have.status(statusCode);
});

Then('el mensaje debe ser {string}', function (mensaje) {
  expect(response.body.mensaje).to.equal(mensaje);
});
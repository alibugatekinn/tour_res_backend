// server.test.js
const request = require('supertest');
const mongoose = require('mongoose');
const app = require('./server'); // server.js'in yolu
const {userDb}= require('./dbConnections/userDb')
describe('API server', () => {
 

  let server;
beforeAll((done) => {
  server = app.listen(5001, done);
});

afterAll(async () => {
  await userDb.close();
  await server.close();
});



  it('responds to get / with status 200', async () => {
    const response = await request(server).get('/');
    expect(response.statusCode).toBe(200);
  });

  // Diğer testler...
});

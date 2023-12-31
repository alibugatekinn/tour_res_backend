// userRoute.test.js
const request = require('supertest');
const mongoose = require('mongoose');
const app = require('../server'); // server.js dosyanızın yolu
const {userDb}= require('./../dbConnections/userDb')

describe('User Routes', () => {

    let server;
    beforeAll((done) => {
      server = app.listen(5001, done);
    });
    
    afterAll(async () => {
        await userDb.close();
        await server.close();
      });
      
      
    
  // Kullanıcı kaydı için test
  it('should create a new user on POST /api/users/signup', async () => {
    const newUser = {
      email: "alibgggtkn2d235s33n4435234@gmail.com",
      password: "Bgtkn.1581",
      role: "user"
    };
    const response = await request(app)
      .post('/api/users/signup')
      .send(newUser);
    
    expect(response.statusCode).toBe(200); // Ya da beklediğiniz başka bir durum kodu
    // Diğer beklenen doğrulamalar
  },10000);

 // Kullanıcı girişi için test
 it('should authenticate a user on POST /api/users/login', async () => {
    const userCredentials = 
        {
            email: "alibgggtkn2d235s33n@gmail.com",
            password: "Bgtkn.1581",
            
          };
    
    const response = await request(app)
      .post('/api/users/login')
      .send(userCredentials);
    
    expect(response.statusCode).toBe(200); // Giriş başarılı ise
    // Diğer beklenen doğrulamalar
  });

   // Kullanıcı çıkışı için test
   it('should logout a user on POST /api/users/logout', async () => {
    const response = await request(app)
      .post('/api/users/logout');
    
    expect(response.statusCode).toBe(200); // Çıkış başarılı ise
    // Diğer beklenen doğrulamalar
  });


  it('should check user authentication on GET /api/users/isUser', async () => {
    const response = await request(app)
      .get('/api/users/isUser');
    
    expect(response.statusCode).toBe(200); // Kullanıcı doğrulanmışsa
    // Diğer beklenen doğrulamalar
  });

  

 
});

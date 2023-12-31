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
      
      
    
      it('should add a new tour on POST /api/tours/add', async () => {
        const newTour = {
            name: "Adana Lezzet ve Kültür Turu3",
            routes : ["Taşköprü", "Seyhan Nehri", "Kazancılar Çarşısı"],
            genres : ["2024", "lezzet"],
            program : [
              {
                day : 1,
                description : "Taşköprü'den Seyhan Nehri manzarası ve tarihi Adana evlerini ziyaret."
              },
              {
                day : 2,
                description : "Seyhan Nehri boyunca yürüyüş ve Adana kebap tadımı."
              },
              {
                day : 3,
                description : "Kazancılar Çarşısı'nda alışveriş ve yerel lezzetleri keşfetme."
              }
            ],
            destinations : [
              {
                name: "Taşköprü",
                description : "Roma döneminden kalma tarihi bir köprü, Adana'nın simgelerinden biri.",
                photos : ["taskopru1.jpg", "taskopru2.jpg"]
              },
              {
                name : "Seyhan Nehri",
                description : "Adana'nın kalbinde akıp giden, şehrin doğal güzelliğini artıran nehir.",
                photos : ["seyhan1.jpg", "seyhan2.jpg"]
              },
              {
                name : "Kazancılar Çarşısı",
                description : "Geleneksel el sanatlarının ve yerel lezzetlerin bulunduğu tarihi çarşı.",
                photos : ["kazancilar1.jpg", "kazancilar2.jpg"]
              }
            ],
            generalPhotos: ["adana1.jpg", "adana2.jpg"],
            generalInformation: "Bu tur, Adana'nın zengin tarihi, kültürel mirası ve eşsiz lezzetlerini keşfetme fırsatı sunar."
          }
          
    
        const response = await request(app)
          .post('/api/tours/add')
          .send(newTour);
    
        expect(response.statusCode).toBe(200); // Başarı durumu kodunu güncelleyin
        // Diğer beklenen doğrulamaları burada ekleyebilirsiniz
      },20000);


      it('should get a list of tours on GET /api/tours/list', async () => {
        const response = await request(app).get('/api/tours/list');
    
        expect(response.statusCode).toBe(200); // Başarı durumu kodunu güncelleyin
        // Diğer beklenen doğrulamaları burada ekleyebilirsiniz
      },20000);

 
});

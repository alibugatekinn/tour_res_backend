const express = require('express');
const app = express();
const mongoose = require('mongoose');
const UsersRoute = require('./Routes/userRoute');
//const ReservationsRoute = require('./Routes/reservationRoute'); // Örneğin rezervasyonlar için bir route modülü varsayalım
require('dotenv').config();
const cors = require('cors');
const cookieParser = require('cookie-parser');

// CORS ve Cookie Parser ayarları
app.use(cors({
    origin: ['https://tour-reservation-app.vercel.app', 'http://localhost:3000'],
    credentials: true
  }));

 


  
app.use(express.json());
app.use(cookieParser());

// Kullanıcılar için route
app.use('/api/users', UsersRoute);

// Rezervasyonlar için route - varsayılan bir route modülünüz olduğunu varsayıyorum
//app.use('/api/reservations', ReservationsRoute);

// Anasayfa route'u
app.get('/', (req, res) => {
    res.send('Merhaba Dünya!');
});

// İki farklı veritabanına bağlantı kurma
const userDbUri = process.env.MONGO_USERDB_URI; // Kullanıcılar için MongoDB URI'si .env dosyasından alınır
//const reservationDbUri = process.env.MONGO_RESERVATIONDB_URI; // Rezervasyonlar için MongoDB URI'si .env dosyasından alınır

// Mongoose ile birden çok bağlantı oluşturma
const userDb = mongoose.createConnection(userDbUri);
//const reservationDb = mongoose.createConnection(reservationDbUri);

// Bağlantı başarılı olduğunda konsola bilgi yazdırma
userDb.once('open', () => {
    console.log('Kullanıcı veritabanına bağlanıldı');
});

//reservationDb.once('open', () => {
//    console.log('Rezervasyon veritabanına bağlanıldı');
//});

// Bağlantı hatalarını yakalama
userDb.on('error', console.error.bind(console, 'MongoDB bağlantı hatası:'));
//reservationDb.on('error', console.error.bind(console, 'MongoDB bağlantı hatası:'));

// Sunucuyu başlatma
const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Sunucu ${port} portunda başlatıldı.`);
});

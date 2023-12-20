const express = require('express');
const app = express();
const mongoose = require('mongoose');
const UsersRoute = require('./Routes/userRoute');
require('dotenv').config();
const cors = require('cors');
const cookieParser = require('cookie-parser');
const {userDb}= require('./dbConnections/userDb')
// CORS ve Cookie Parser ayarları
app.use(cors({
  origin: ['https://tour-reservation-dzez2xug6-alibugatekinns-projects.vercel.app/', 'http://localhost:3000'],
  credentials: true
}));

app.use(express.json());
app.use(cookieParser());

// Kullanıcılar için route
app.use('/api/users', UsersRoute);

// Rezervasyonlar için route
//app.use('/api/reservations', ReservationsRoute); // Artık kullanılabilir

// Anasayfa route'u
app.get('/', (req, res) => {
  res.send('Merhaba Dünya!');
});





// Bağlantı başarılı olduğunda konsola bilgi yazdırma
userDb.once('open', () => {
  console.log('Kullanıcı veritabanına bağlanıldı');
});

//reservationDb.once('open', () => {
//  console.log('Rezervasyon veritabanına bağlanıldı');
//});

// Bağlantı hatalarını yakalama
userDb.on('error', console.error.bind(console, 'MongoDB bağlantı hatası:'));
//reservationDb.on('error', console.error.bind(console, 'MongoDB bağlantı hatası:'));

// Sunucuyu başlatma
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Sunucu ${port} portunda başlatıldı.`);
});

// Bağlantıları dışa aktarma


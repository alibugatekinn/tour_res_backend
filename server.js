const express = require('express');
const app = express();
const mongoose = require('mongoose');
const UsersRoute = require('./Routes/userRoute');
require('dotenv').config();
const cors = require('cors');
const cookieParser = require('cookie-parser');
const {userDb}= require('./dbConnections/userDb')
// CORS ve Cookie Parser ayarları
const corsOptions = {
  origin: function (origin, callback) {
    if (['http://localhost:3000','https://tour-reservation-890hj027v-alibugatekinns-projects.vercel.app/'].indexOf(origin) !== -1 || !origin) {
      callback(null, true);
    } else {
      callback(new Error('CORS policy violation'));
    }
  },
  credentials: true
};

app.use(cors(corsOptions));



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


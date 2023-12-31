const express = require('express');
const app = express();
const mongoose = require('mongoose');
const UsersRoute = require('./Routes/userRoute');
const toursRoute = require('./Routes/tourRoute');
require('dotenv').config();
const cors = require('cors');
const cookieParser = require('cookie-parser');
const {userDb}= require('./dbConnections/userDb')
// CORS ve Cookie Parser ayarları
const corsOptions = {
  origin: function (origin, callback) {
    if (['http://localhost:3000','https://tour-reservation-1h6b0jhg0-alibugatekinns-projects.vercel.app/'].indexOf(origin) !== -1 || !origin) {
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

//turlar için route
app.use('/api/tours', toursRoute);



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
if (process.env.NODE_ENV !== 'test') {
  const port = process.env.PORT || 3000;
  app.listen(port, () => {
    console.log(`Sunucu ${port} portunda başlatıldı.`);
  });
}





// Bağlantıları dışa aktarma

module.exports = app;

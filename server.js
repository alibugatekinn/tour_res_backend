const express = require('express');
const app = express();
const mongoose=require('mongoose');
const UsersRoute=require('./Routes/userRoute');
require('dotenv').config();
const cors = require('cors'); 
const cookieParser = require('cookie-parser');
app.use(cors({
    origin: 'https://tour-reservation-app.vercel.app/',
    credentials: true 
  }));
const port = process.env.PORT || 3000;
app.use(express.json());
app.use(cookieParser());
app.use('/api/users',UsersRoute);

app.get('/', (req, res) => {
    res.send('Merhaba Dünya!');
  });

mongoose.connect(process.env.MONGO_URI)
    .then(()=>{
            console.log('veritabanı bağlandı');
            app.listen(process.env.PORT, () => {
                console.log(`Sunucu ${process.env.PORT} portunda başlatıldı.`);
            });
    })
    .catch(err=>{
        console.log(err);
    })
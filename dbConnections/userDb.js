const mongoose = require('mongoose');
require('dotenv').config();
// 'user' veritabanı için bağlantı
const userDb = mongoose.createConnection(process.env.MONGO_USERDB_URI, {
  

  
});

module.exports = { userDb };

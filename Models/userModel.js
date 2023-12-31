const mongoose = require('mongoose');
const bcrypt= require('bcrypt');
const validator= require('validator');
const { userDb } = require('../dbConnections/userDb');

const userSchema = new mongoose.Schema({
    
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        enum: ['user', 'admin'],  // Önceden tanımlanmış roller. Daha fazla eklemek için bu listeye eklenebilir.
        default: 'user'  // Eğer bir rol belirtilmezse, varsayılan olarak 'user' atanacaktır.
    }
    
});

userSchema.statics.signup= async function(email, password,role){

    if (!email || !password) {
        throw new Error('alanlar boş geçilemez');
    }

    if (!validator.isEmail(email)) {
        throw new Error('email kurallara uygun değil');
    }

    if (!validator.isStrongPassword(password)) {
        throw new Error('password güçlü değil');
    }

    const kontrolkullanici= await this.findOne({email})

    if (kontrolkullanici) {
        throw new Error('email zaten kullanılıyor');
    }

    const salt= await bcrypt.genSalt(10);
    const hashedpassword= await bcrypt.hash(password,salt);
    const user = await this.create({ email, password: hashedpassword, role });

    return user;
}

userSchema.statics.login = async function(email, password) {
    const user = await this.findOne({ email });
    if (!user) {
        throw new Error('Bu e-posta adresi ile bir kullanıcı bulunamadı.');
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
        throw new Error('Şifre yanlış.');
    }
    
    return user;  // Doğruysa user objesini döndür.
}


const User = userDb.model('User', userSchema);

module.exports = User;
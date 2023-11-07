const userModel = require('../Models/userModel')
require('dotenv').config();
const jwt = require('jsonwebtoken');

const createToken = (_id, role) => {
    return jwt.sign({ _id, role }, process.env.SECRET_KEY, { expiresIn: '1h' });
}

const createRefreshToken = (_id, role) => {
    return jwt.sign({ _id, role }, process.env.REFRESH_SECRET, { expiresIn: '7d' }); // Örnek olarak 7 gün geçerlilik süresi verdik.
};

const signupUser = async (req, res) => {
    const { email, password, role } = req.body;
    try {
        const user = await userModel.signup(email, password, role);
        const token = createToken(user._id, user.role);  // user'ın rol bilgisini de token'a ekledik.

        // JWT token'ını HTTP-only çerez olarak ayarla.
        res.cookie('token', token, {
            httpOnly: true,
            maxAge: 3600000, // 1 saat (mili saniye cinsinden)
        });
        const refreshToken = createRefreshToken(user._id, user.role);
        res.cookie('refreshToken', refreshToken, {
            httpOnly: true,
            maxAge: 7 * 24 * 60 * 60 * 1000 // 7 gün
        });


        res.status(200).json({ mesaj:"kayıt başarılı" });
    } catch (error) {
        res.status(400).json({ hata: error.message });
        console.error('Kullanıcı kayıt hatası:', error);
       
    }
}

const loginUser = async (req, res) => {
    const { email, password } = req.body;
    try {
        
        const user = await userModel.login(email, password);  // Login fonksiyonuyla doğrulama.
        const token = createToken(user._id, user.role);

        res.cookie('token', token, {
            httpOnly: true,
            maxAge: 3600000,
        });
        const refreshToken = createRefreshToken(user._id,user.role);
        res.cookie('refreshToken', refreshToken, {
            httpOnly: true,
            maxAge: 7 * 24 * 60 * 60 * 1000 // 7 gün
        });

        res.status(200).json({mesaj:"login başarılı"});
    } catch (error) {
        res.status(400).json({ hata: error.message });
    }
}


const logoutUser = (req, res) => {
    // JWT token'ını içeren HTTP-only çerezi sil.
    res.clearCookie('token');
    res.clearCookie('refreshToken')
    res.status(200).json({ mesaj: 'çıkış başarılı' });
}


module.exports = {
    signupUser,
    logoutUser,
    loginUser

};
const jwt= require('jsonwebtoken');
const userModel = require('../Models/userModel');

const createToken = (_id, role) => {
    return jwt.sign({ _id, role }, process.env.SECRET_KEY, { expiresIn: '1h' });
};
const tokenControl = async (req, res, next) => {
    const accessToken = req.cookies.token;

   
    
    if (accessToken) {
        try {
            jwt.verify(accessToken, process.env.SECRET_KEY);
            next();
        } catch (error) {
            const refreshToken = req.cookies.refreshToken;
            if (refreshToken) {
                jwt.verify(refreshToken, process.env.REFRESH_SECRET, async (err, decoded) => {
                    if (err) {
                        // Yenileme tokeni de geçersiz
                        return res.status(401).json({ error: "Lütfen tekrar giriş yapın" });
                    }
                    
                    const user = await userModel.findById(decoded._id);
                    
                    if (!user) {
                        return res.status(404).json({ error: "Kullanıcı bulunamadı" });
                    }

                    const newAccessToken = createToken(user._id, user.role);
                    res.cookie('token', newAccessToken, {
                        httpOnly: true,
                        maxAge: 3600000
                    });
                    
                    next();
                });
            } else {
                return res.status(401).json({ error: "Lütfen tekrar giriş yapın" });
            }
        }
    } else {
        return res.status(401).json({ error: "Token bulunamadı. Lütfen giriş yapın" });
    }
};

module.exports = tokenControl; 
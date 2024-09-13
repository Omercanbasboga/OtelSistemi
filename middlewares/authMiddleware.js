import jwt from 'jsonwebtoken';
import Person from '../models/personModel.js';

const jwtAuthMiddleware = (req, res, next) => {
    
    const authorization = req.headers.authorization;
    let token;

    // Authorization başlığı varsa ve Bearer ile başlıyorsa token'ı ayıkla
    if (authorization && authorization.startsWith('Bearer ')) {
        token = authorization.split(' ')[1];
    } else if (req.cookies && req.cookies.authToken) {
        // Token cookie'de de olabilir
        token = req.cookies.authToken;
    }

    // Token yoksa hata döndür
    if (!token) {
        return res.redirect('/admin/login');  
    }

    try {
        // Token'ı doğrulama işlemi
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        // Kullanıcı bilgilerini isteğe ekleme
        req.user = decoded;
        next();
    } catch (err) {
        console.error(err);
        return res.status(401).json({ error: 'Invalid token' });
    }
};

// Function to generate JWT token
const generateToken = (userData) => {
    // Generate a new JWT token using user data
    return jwt.sign(userData, process.env.JWT_SECRET, { expiresIn: '1h' });
};

const setUserMiddleware = (req, res, next) => {
    if (req.user) {
        res.locals.user = req.user;
    } else {
        res.locals.user = null;
    }
    next();
};

export { jwtAuthMiddleware, generateToken, setUserMiddleware };

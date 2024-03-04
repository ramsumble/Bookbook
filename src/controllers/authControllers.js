const jwt = require('jsonwebtoken');
require('dotenv').config();

const secretKey = process.env.SECRET_KEY // || 'something-key';

const authenticateUser = (req, res, next) => {
    const token = req.headers.authorization;

    console.log('Token is: ', token);

    if (!token) {
        return res.status(401).json({ error: 'Unauthorized: Token not provided' });
    }

    jwt.verify(token, secretKey, (err, decoded) => {
        if (err) {
            return res.status(401).json({ error: 'Unauthorized: Invalid token' });
        }
        req.userId = decoded.userId;
        next();
    });
};

module.exports = { authenticateUser };
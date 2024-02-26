const express = require('express');
const jwt = require('jsonwebtoken');
const UserModel = require('../models/userModels');
const router = express.Router();

require('dotenv').config();

const secretKey = process.env.SECRET_KEY // || 'something-key';

router.post('/', async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await UserModel.findOne({ email });

        if (user && await user.comparePassword(password)) {
            // console.log('Secret Key:', secretKey);
            const token = jwt.sign({ userId: user._id }, secretKey, { expiresIn: '1h' });
            res.json({ token });
        } else {
            res.status(401).json({ error: 'Invalid email or password' });
        }
    } catch (error) {
        console.error('Login error:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

module.exports = router;
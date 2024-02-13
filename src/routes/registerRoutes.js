const express = require('express');
const UserModel = require('../models/userModels');
const router = express.Router();

router.post('/', async (req, res) => {
    try {
        const { username, email, password } = req.body;
        const user = new UserModel({ username, email, password });
        await user.save();
        res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
        console.error('Registration error:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

module.exports = router;
const express = require('express');
const router = express.Router();
const UserModel = require('../models/userModels');

router.post('/', async (req, res) => {
    try {
        const { userId, bookId } = req.body;

        const user = await UserModel.findById(userId);
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        // Add the book to the user's favorites
        user.favourites.push(bookId);
        await user.save();

        res.json({ message: 'Book added to favorites successfully' });
    } catch (error) {
        console.error('Error adding book to favorites:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

module.exports = router;
const express = require('express');
const UserModel = require('../models/userModels');
const router = express.Router();

router.post('/', async (req, res) => {
    try {
        const { userId, bookData } = req.body;

        // Find user by id
        const user = await UserModel.findById(userId);

        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        if (!user.bookCollection) {
            user.bookCollection = [];
        }
        
        // check if the book data is valid
        if (!bookData || !bookData._id) {
            return res.status(400).json({ error: 'Invalid book data' });
          }

        // Check if the book already exists 
        const existingBook = user.bookCollection.find(bookId => bookId.equals(bookData._id));

        if (existingBook) {
            return res.status(400).json({ error: 'Book already in the collection' });
        }

        // Add the book to the users collection
        user.bookCollection.push(bookData._id);
        await user.save();

        res.json({ message: 'Book added to collection successfully' });

    } catch (error) {
        console.error('Error adding book to collection:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

module.exports = router;
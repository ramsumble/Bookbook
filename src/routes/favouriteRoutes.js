const express = require('express');
const router = express.Router();
const UserModel = require('../models/userModels');

router.post('/', async (req, res) => {
    try {
        const { userId, bookData } = req.body;

        const user = await UserModel.findById(userId);
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        // copy same logic for collectionRoute

        if (!user.favourites) {
            user.favourites = [];
        }

        // Check if the book data is valid
        if (!bookData || !bookData.title || !bookData.author) {
            console.error('Invalid book data:', bookData);
            return res.status(400).json({ error: 'Invalid book data' });
        }

        console.log('User ID:', userId);
        console.log('Book Data:', bookData);
        console.log('Existing Favorites:', user.favourites);

        // Check if the book already exists in the user's collection
        const existingBook = user.favourites.find(bookId => bookId && bookId.equals(bookData._id));

        console.log(existingBook)

        if (existingBook) {
            return res.status(400).json({ error: 'Book already in the collection' }); // handle this with toastify later
        }

        // Add the book to the user's favorites
        user.favourites.push(bookData._id);
        await user.save();

        res.json({ message: 'Book added to favorites successfully' });
    } catch (error) {
        console.error('Error adding book to favorites:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

module.exports = router;
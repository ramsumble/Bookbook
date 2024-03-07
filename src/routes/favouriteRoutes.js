const express = require('express');
const UserModel = require('../models/userModels');
const BookModel = require('../models/bookModels');
const router = express.Router();

router.post('/', async (req, res) => {
    try {
        const { userId, bookData } = req.body;

        // Find user by id
        const user = await UserModel.findById(userId);

        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        if (!user.favourites) {
            user.favourites = [];
        }

        // Check if the book data is valid
        if (!bookData || !bookData.title || !bookData.author) {
            console.error('Invalid book data:', bookData);
            return res.status(400).json({ error: 'Invalid book data' });
        }

        console.log('bookId:', bookData);
        console.log('bookData._id:', bookData._id);

        // Check if the book already exists in the user's collection
        const existingBook = user.favourites.find(bookId => bookId === (bookData._id));

        if (existingBook) {
            return res.status(400).json({ error: 'Book already in the collection' });
        }

        // Create or retrieve the book in the database
        const existingBookInDB = await BookModel.findOne({ title: bookData.title, author: bookData.author });

        if (existingBookInDB) {
            console.log("book in db: ", existingBookInDB)
            console.log("ID in db", existingBookInDB._id)
            // If the book already exists in the database, add its ID to the user's collection
            user.favourites.push(existingBookInDB._id);
        } else {
            // If the book doesn't exist, create it and add its ID to the user's collection
            const newBook = await BookModel.create(bookData);
            user.favourites.push(newBook._id);
        }

        await user.save();

        res.json({ message: 'Book added to collection successfully' });
    } catch (error) {
        console.error('Error adding book to collection:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

module.exports = router;
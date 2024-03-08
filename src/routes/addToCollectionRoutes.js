const express = require('express');
const UserModel = require('../models/userModels');
const BookModel = require('../models/bookModels');
const { removeFromBookCollection } = require('../controllers/bookControllers');
const { authenticateUser } = require('../controllers/authControllers');
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

        // Check if the book data is valid
        if (!bookData || !bookData.title || !bookData.author) {
            console.error('Invalid book data:', bookData);
            return res.status(400).json({ error: 'Invalid book data' });
        }

        // console.log('bookId:', bookData);
        // console.log('bookData._id:', bookData._id);

        // Check if the book already exists in the user's collection
        const existingBook = user.bookCollection.find(bookId => bookId === (bookData._id));

        if (existingBook) {
            return res.status(400).json({ error: 'Book already in the collection' });
        }

        // Create or retrieve the book in the database
        const existingBookInDB = await BookModel.findOne({ title: bookData.title, author: bookData.author });

        if (existingBookInDB) {
            // If the book already exists in the database, add its ID and isRead to the user's collection
            user.bookCollection.push({ bookId: existingBookInDB._id, isRead: isRead || false });
        } else {
            // If the book doesn't exist, create it and add its ID and isRead to the user's collection
            const newBook = await BookModel.create(bookData);
            user.bookCollection.push({ bookId: newBook._id, isRead: isRead || false });
        }

        await user.save();

        res.json({ message: 'Book added to collection successfully' });
    } catch (error) {
        console.error('Error adding book to collection:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});


router.delete('/', authenticateUser, async (req, res) => {
    try {
        const userId = req.userId;
        const { bookData } = req.body;
        
        console.log('Received book ID: ', bookData);
        // Call the function from contorller
        const result = await removeFromBookCollection(userId, bookData._id);
  
        res.json(result);
        } catch (error) {
        console.error('Error removing book from favourites collection:', error);
        res.status(500).json({ error: 'Internal Server Error' });
        }
    });

module.exports = router;
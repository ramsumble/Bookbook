const express = require('express');
const router = express.Router();
const { searchAndSaveBooks } = require('../controllers/bookControllers');


router.get('/search-books', async (req, res) => {
    try {
        const searchTerm = req.query.searchTerm;
        const savedBooks = await searchAndSaveBooks(searchTerm);
        res.json(savedBooks);
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

module.exports = router;
const express = require('express');
const router = express.Router();
const { searchAndSaveBooks, getUserBookCollection } = require('../controllers/bookControllers');
const { authenticateUser } = require('../controllers/authControllers')


router.get('/search-books', authenticateUser, async (req, res) => {
    try {
      const searchTerm = req.query.searchTerm;
      const userId = req.userId; // accessing userId 
  
      const savedBooks = await searchAndSaveBooks(userId, searchTerm);
      res.json(savedBooks);
    } catch (error) {
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });

  router.get('/user-collection', authenticateUser, async (req, res) => {
    try {
      const userId = req.userId; 
  
      const userBookCollection = await getUserBookCollection(userId);
      res.json(userBookCollection);
    } catch (error) {
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });
  
  module.exports = router;

const express = require('express');
const router = express.Router();
const { getUserBookCollection } = require('../controllers/bookControllers');
const { authenticateUser } = require('../controllers/authControllers')

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
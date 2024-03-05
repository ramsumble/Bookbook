const express = require('express');
const router = express.Router();
const { getUserBookCollection } = require('../controllers/bookControllers');
const { authenticateUser } = require('../controllers/authControllers')

  router.get('/', authenticateUser, async (req, res) => {
    try {
      const userId = req.userId; 
      const userBookCollection = await getUserBookCollection(userId);

      // logging to check contents of book collection 
      console.log('User Book Collection:', userBookCollection);

      res.json(userBookCollection);
    } catch (error) {
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });
  
  module.exports = router;
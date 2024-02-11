const mongoose = require('mongoose');
const UserModel = require("./models/userModels")
const express = require('express');
// const { dbConnect } = require('./db');
const { searchAndSaveBooks } = require('./controllers/bookControllers');


const app = express();
const PORT = process.env.PORT || 3000;


app.use(express.json());


async function dbConnect(){
    try {
        await mongoose.connect('mongodb://localhost:27017/Bookbook');
        console.log("Database connected!");
    } catch (error) {
        console.log(`dbConnect failed! Error:\n${JSON.stringify(error)}`);
    }
}

dbConnect();


// start of routes - will need to migrate to a seperate file eventually
app.get('/search-books', async (req, res) => {
    try {
      const searchTerm = req.query.searchTerm;
      const savedBooks = await searchAndSaveBooks(searchTerm);
      res.json(savedBooks);
    } catch (error) {
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });


  app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
  });

module.exports = {
    UserModel,
  };
const express = require('express');
const app = express();


app.use(express.json()); //used to parse json data


// import other routes
const searchBook = require('./routes/bookRoutes')


// use the routes
app.use('/books', searchBook)


app.get('/', (req, res) => { 
    res.send('Hello Heroku!'); 
  }); 


module.exports = {
    app
}
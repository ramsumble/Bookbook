const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json()); //used to parse json data


// import other routes
const searchBook = require('./routes/bookRoutes')
const registerRoute = require('./routes/registerRoutes')
const loginRoute = require('./routes/loginRoutes')


// use the routes
app.use('/books', searchBook)
app.use('/api/register', registerRoute);
app.use('/api/login', loginRoute);

// need to seperate public routes and private routes eventually

app.get('/', (req, res) => { 
    res.send('Hello Heroku!'); 
  }); 


module.exports = {
    app
}
const { dbConnect } = require('./database');
const { app } = require ('./server');

const PORT = process.env.PORT || 3000;

require('dotenv').config();


// connect to db
app.listen(PORT, async() => {
  await dbConnect();
  console.log(`Server is running on ${PORT}`);
});


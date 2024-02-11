const mongoose = require('mongoose');

async function dbConnect(){
    try {
        console.log('Connecting to: ' + process.env.DB_URI)
        await mongoose.connect(process.env.DB_URI);
        console.log("Database connected!");
    } catch (error) {
        console.log(`dbConnect failed! Error:\n${JSON.stringify(error)}`);
    }
}

// dbConnect();
module.exports = {
    dbConnect
}
const mongoose = require('mongoose');
const UserModel = require("./models/userModels")

async function dbConnect(){
    try {
        await mongoose.connect('mongodb://localhost:27017/Bookbook');
        console.log("Database connected!");
    } catch (error) {
        console.log(`dbConnect failed! Error:\n${JSON.stringify(error)}`);
    }
}

dbConnect();

module.exports = {
    UserModel,
  };
const { MongoMemoryServer } = require('mongodb-memory-server');

let mongoServer;

module.exports = async () => {
  if (!mongoServer) {
    mongoServer = await MongoMemoryServer.create();
    const mongoUri = mongoServer.getUri();

    global.__MONGO_URI__ = mongoUri;
    process.env.MONGODB_URI = mongoUri;

    console.log('MongoDB Server URI:', global.__MONGO_URI__);
  }
};
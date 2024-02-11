const { createUser, getUserById, updateUserById, deleteUserById } = require('../../services/userServices')
const mongoose = require('mongoose');
const UserModel = require('../../models/userModels');

describe('User CRUD Operations', () => {


  beforeAll(async () => {
    let db;

    // Connect to the test database 
    await mongoose.connect('mongodb://localhost/testDatabase', { useNewUrlParser: true, useUnifiedTopology: true });
    db = mongoose.connection.db;

    // Log the number of documents for debugging
    // const userCollection = db.collection('users');
    // const userCount = await userCollection.countDocuments();
    // console.log(`Number of users before test: ${userCount}`);
  });

  afterAll(async () => {
    // Disconnect from the test after all tests are complete
    await mongoose.disconnect();
  });

  // beforeEach(async () => {
  //   // Clear the User collection before each test
  //   await UserModel.deleteMany({});
  // });

  it('should create a new user', async () => {
    const userData = {
      username: 'testUser',
      email: 'test@example.com',
      password: 'password123'
    };
  
    try {
      await UserModel.deleteOne({ username: userData.username }); // delete the user just incase it was created in previous testing
      
      const newUser = await createUser(userData);
  
      expect(newUser).toBeDefined(); // use toBeDefined to check if newUser is not undefined
      expect(newUser.username).toBe(userData.username);

      testUserId = newUser._id; // save the created user ID for future tests

    } catch (error) {
      throw new Error(error);
    }
  });

    it('should get a user by ID', async () => {
    const user = await getUserById(testUserId); // reusing test user from create test
    expect(user).toHaveProperty('_id');
    expect(user._id.toString()).toBe(testUserId.toString());
  });

    it('should update a user by ID', async () => {
    const updatedData = { username: 'updatedUser', email: 'updated@example.com' };
    const updatedUser = await updateUserById(testUserId, updatedData);
    expect(updatedUser).toHaveProperty('_id');
    expect(updatedUser.username).toBe(updatedData.username);
    expect(updatedUser.email).toBe(updatedData.email);
  });

  it('should delete a user by ID', async () => {
    const deletedUser = await deleteUserById(testUserId);
    expect(deletedUser).toHaveProperty('_id');
    expect(deletedUser._id.toString()).toBe(testUserId.toString());
  });

});
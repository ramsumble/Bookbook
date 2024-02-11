const UserModel = require('../models/userModels')

// Create a new user
async function createUser(userData) {
  try {
    const newUser = await UserModel.create(userData);
    return newUser;
  } catch (error) {
    throw error;
  }
}

// Get all users
async function getAllUsers() {
  try {
    const users = await UserModel.find();
    return users;
  } catch (error) {
    throw error;
  }
}

// Get user by ID
async function getUserById(userId) {
  try {
    const user = await UserModel.findById(userId);
    return user;
  } catch (error) {
    throw error;
  }
}

// Update user by ID
async function updateUserById(userId, updatedUserData) {
  try {
    const updatedUser = await UserModel.findByIdAndUpdate(userId, updatedUserData, { new: true });
    return updatedUser;
  } catch (error) {
    throw error;
  }
}

// Delete user by ID
async function deleteUserById(userId) {
  try {
    const deletedUser = await UserModel.findByIdAndDelete(userId);
    return deletedUser;
  } catch (error) {
    throw error;
  }
}

module.exports = {
  createUser,
  getAllUsers,
  getUserById,
  updateUserById,
  deleteUserById,
};
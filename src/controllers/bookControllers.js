const axios = require('axios');
const BookModel = require('../models/bookModels');
const UserModel = require('../models/userModels');

// search for books based on the search term
async function searchAndSaveBooks(userId, searchTerm) {
    try {
        const response = await axios.get('https://www.googleapis.com/books/v1/volumes', { 
            params: { q: searchTerm },
    });

    // get the book data from the response 
    // const bookDataFromApi = response.data.items.map(item => item.volumeInfo);
    const bookDataFromApi = response.data.items.map(item => {
      const volumeInfo = item.volumeInfo;
      return {
          title: volumeInfo.title,
          author: volumeInfo.authors ? volumeInfo.authors.join(', ') : undefined,
          publisher: volumeInfo.publisher,
          description: volumeInfo.description,
          yearPublished: volumeInfo.publishedDate ? new Date(volumeInfo.publishedDate).getFullYear() : undefined,
          genre: volumeInfo.categories ? volumeInfo.categories.join(', ') : undefined,
          pageCount: volumeInfo.pageCount,
          image: volumeInfo.imageLinks ? volumeInfo.imageLinks.thumbnail : undefined
      };
  });

    // const savedBooks = await BookModel.create(bookDataFromApi); //remove later when we store only selected books from front end
  const savedBooks = await Promise.all(bookDataFromApi.map(async (bookData) => {
    const existingBook = await BookModel.findOne({ title: bookData.title, author: bookData.author });

    if (existingBook) {
        // If the book already exists return the id
        return existingBook;
        
    } else {
        // create the book and return id
        const newBook = await BookModel.create(bookData);
        return newBook;
    }
  }));

  // Update the users collection with the new book ids
  // await UserModel.findByIdAndUpdate(userId, { $push: { bookCollection: { $each: savedBooks } } });

  return savedBooks;    
  // return bookDataFromApi;

  } catch (error) {
    console.error('Error searching and saving books:', error);
    throw error; // Propagate the error to the caller
  }
}

// function to retrieve data from the bookCollection... collection
async function getUserBookCollection(userId) {
  try {
    // we can use populate to reference documents from another collection
    const user = await UserModel.findById(userId).populate('bookCollection'); 

    if (!user) {
      throw new Error('User not found');
    }

    return user.bookCollection;
  } catch (error) {
    console.error('Error getting data from bookCollection:', error);
    throw error; // Propagate the error to the caller
  }
}

// get data from the readingCollection... collection
async function getUserreadingCollection(userId) {
  try {
    // we can use populate to reference documents from another collection
    const user = await UserModel.findById(userId).populate('readingCollection'); 

    if (!user) {
      throw new Error('User not found');
    }

    return user.readingCollection;
  } catch (error) {
    console.error('Error getting data from readingCollection:', error);
    throw error; // Propagate the error to the caller
  }
}

// get data from the favourites collection
async function getUserFavouriteCollection(userId) {
  try {
    // we can use populate to reference documents from another collection
    const user = await UserModel.findById(userId).populate('favourites'); 

    if (!user) {
      throw new Error('User not found');
    }

    return user.favourites;
  } catch (error) {
    console.error('Error getting data from readingCollection:', error);
    throw error; // Propagate the error to the caller
  }
}

async function removeFromFavouritesCollection(userId, bookIdToRemove) {
  try {
    const user = await UserModel.findById(userId);

    if (!user) {
      throw new Error('User not found');
    }

    // Remove the bookIdToRemove from the favourites array
    user.favourites = user.favourites.filter(bookId => bookId.toString() !== bookIdToRemove.toString());

    // Save the updated user document
    await user.save();

    return { success: true, message: 'Book removed from favourites collection successfully' };
  } catch (error) {
    console.error('Error removing book from favourites collection:', error);
    throw error; // Propagate the error to the caller
  }
}

module.exports = { 
  searchAndSaveBooks, 
  getUserBookCollection, 
  getUserreadingCollection, 
  getUserFavouriteCollection,
  removeFromFavouritesCollection 
};
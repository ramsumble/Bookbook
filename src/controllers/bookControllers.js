const axios = require('axios');
const BookModel = require('../models/bookModels');
const UserModel = require('../models/userModels');

// search for books based on the search term
async function searchAndSaveBooks(userId, searchTerm) {
    try {
        console.log('Request URL:', 'https://www.googleapis.com/books/v1/volumes', { params: { q: searchTerm } }); //debugging
        const response = await axios.get('https://www.googleapis.com/books/v1/volumes', { 
            params: { q: searchTerm },
    });

    // get the book data from the response 
    // const bookDataFromApi = response.data.items.map(item => item.volumeInfo);
    const bookDataFromApi = response.data.items.map(item => {
      console.log('Google Books API Response:', response.data); //debugging
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
        return existingBook._id;
        
    } else {
        // create the book and return id
        const newBook = await BookModel.create(bookData);
        return newBook._id;
    }
  }));

  // Update the users collection with the new book ids
  await UserModel.findByIdAndUpdate(userId, { $push: { bookCollection: { $each: savedBooks } } });

  return savedBooks;    
  // return bookDataFromApi;

  } catch (error) {
    console.error('Error searching and saving books:', error);
    throw error; // Propagate the error to the caller
  }
}

module.exports = { searchAndSaveBooks };

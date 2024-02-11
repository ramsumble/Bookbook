const axios = require('axios');
const BookModel = require('../models/bookModels');

// search for books based on the search term
async function searchAndSaveBooks(searchTerm) {
    try {
        const response = await axios.get('https://www.googleapis.com/books/v1/volumes', { 
            params: { q: searchTerm },
    });

    // get the book data from the response 
    const bookDataFromApi = response.data.items.map(item => item.volumeInfo);

    const savedBooks = await BookModel.create(bookDataFromApi); //remove later when we store only selected books from front end
    return savedBooks;
  } catch (error) {
    console.error('Error searching and saving books:', error);
    throw error; // Propagate the error to the caller
  }
}

module.exports = { searchAndSaveBooks };
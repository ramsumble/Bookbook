const axios = require('axios');
const BookModel = require('../models/bookModels');
// const UserModel = require('../models/userModels');

// search for books based on the search term
async function searchAndSaveBooks(searchTerm) {
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

    // return savedBooks;
    return bookDataFromApi;

} catch (error) {
  console.error('Error searching and saving books:', error);
  throw error; // Propagate the error to the caller
}
}

module.exports = { searchAndSaveBooks };

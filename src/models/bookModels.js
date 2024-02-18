const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
    title: { type: String, required: true },
    author: { type: String },
    publisher: { type: String },
    description: { type: String },
    yearPublished: { type: Number },
    genre: { type: String },
    pageCount: {type: Number },
    image: { type: String }
});

const BookModel = mongoose.model('Book', bookSchema);

module.exports = BookModel;
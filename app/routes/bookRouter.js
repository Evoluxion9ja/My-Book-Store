const express = require('express');
const booksController = require('../controllers/bookController');
const Router = express.Router();

Router.get('/', booksController.getAllBooks);
Router.post('/',booksController.createBook);
Router.get('/:bookId', booksController.getSingleBook);
Router.patch('/:bookId', booksController.updateBook);
Router.delete('/:bookId', booksController.deleteBook);

module.exports = Router;
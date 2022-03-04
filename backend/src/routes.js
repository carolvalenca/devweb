const express = require('express')
const routes = express.Router()

const BookController = require('./controllers/bookController');

routes.get('/books', BookController.getBooks);

routes.get('/books/:id', BookController.getBook);

routes.post('/books/save', BookController.saveBook);

routes.put('/books/edit/:id', BookController.editBook);

routes.delete('/books/delete/:id', BookController.deleteBook);

module.exports = routes
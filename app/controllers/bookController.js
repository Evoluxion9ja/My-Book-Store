const Book = require('../models/bookModel');


exports.getAllBooks = (req, res, next) => {
    Book.find()
    .select('id name author ISBN price')
    .then(books => {
        const response = {
            count: books.length,
            book: books.map(book => {
                return {
                    _id: book.id,
                    title: book.title,
                    author: book.author,
                    ISBN: book.ISBN,
                    price: book.price,
                    request:{
                        type: 'GET',
                        url: 'http://localhost:3000/books/' + book.id
                    }
                }
            })
        }
        if(!books){
            res.status(404).json({
                message: 'There are no books in the store'
            })
        }
        res.status(200).json({
            message: 'Here is a list of all the books available in the store',
            response
        })
    })
    .catch((err) => {
        res.status(500).json({error: err})
    });
}

exports.createBook = (req, res, next) => {
    console.log(req.file);
    const book = new Book({
        title: req.body.title,
        author: req.body.author,
        ISBN: req.body.ISBN,
        price: req.body.price
    })
    book.save()
    .then(result => {
        const response = {
            book:{
                _id: result.id,
                title: result.title,
                author: result.author,
                ISBN: result.ISBN,
                price: result.price
            },
            request:{
                type: 'GET',
                url: 'http://localhost:3000/books/' + result.id 
            }
        }
        res.status(201).json({
            message: 'Book was added to inventory successfully',
            createdBook:response
        })
    })
    .catch((err) => {
        res.status(500).json({error: err})
    });
}

exports.getSingleBook = (req, res, next) => {
    const book_id = req.params.bookId;
    Book.findById(book_id)
    .then(book => {
        if(!book){
            res.status(404).json({
                message: 'The requested book does not exist, please choose another one'
            })
        }
        res.status(200).json({
            message: `Here is an information on ${book.title}`,
            book:{
                _id: book.id,
                title: book.title,
                author: book.author,
                ISBN: book.ISBN,
                price: "$ " + book.price,
                request:{
                    type: 'GET',
                    url: 'http://localhost:3000/books/' + book.id
                }
            }
        })
    })
    .catch((err) => {
        res.status(500).json({error: err})
    });
}

exports.updateBook = (req, res, next) => {
    const book_id = req.params.bookId;
    const updatingBookOperations = {};
    for(const operations of req.body){
        updatingBookOperations[operations.propertyName] = operations.value
    }
    Book.update({_id: book_id}, {$set: updatingBookOperations})
    .then((result) => {
        res.status(200).json({
            message: 'Product has been successfully updated',
            result,
            request:{
                type: 'GET',
                url: 'http://localhost:3000/books/' + result.id
            }
        })
    }).catch((err) => {
        res.status(500).json({error: err});
    });
}

exports.deleteBook = (req, res, next) => {
    const book_id = req.params.bookId;
    Book.remove({_id: book_id})
    .then((result) => {
        res.status(200).json({
            message: 'Book was deleted from the store successfully',
            request:{
                type: 'POST',
                url: 'http://localhost:3000/books',
                body: {
                    title: "String",
                    author: "String",
                    ISBN: "Number",
                    price: 'Number'
                }
            }
        })
    })
    .catch((err) => {
        res.status(500).json({error: err});
    });
}
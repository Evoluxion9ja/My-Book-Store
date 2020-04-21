const express = require('express');
const body_parser = require('body-parser');
const mongoose = require('mongoose');
const MONGODB_URI = 'mongodb://localhost/Book-Store';
const morgan = require('morgan');
const MongoUses = {
    useCreateIndex: true,
    useFindAndModify: false,
    useNewUrlParser: true,
    useUnifiedTopology: true
}
const app = express();

app.use(body_parser.urlencoded({extended: false}));
app.use(body_parser.json());

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'OPTIONS, GET, POST, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    next();
})

app.use(morgan('dev'))

const bookRouter = require('./app/routes/bookRouter');
const orderRouter = require('./app/routes/orderRouter');

app.use('/books', bookRouter);
app.use('/orders', orderRouter);
app.use((req, res, next) => {
    const error = new Error('Page was not found');
    error.status = 404;
    next(error);
})
app.use((error, req, res, next) => {
    res.status(error.status || 500);
    res.json({
        error:{
            message: error.message
        }
    })
})

mongoose.connect(MONGODB_URI, MongoUses)
.then((result) => {
    app.listen(3000);
    console.log('Server Connected');
})
.catch((err) => {
    console.log(err);    
});
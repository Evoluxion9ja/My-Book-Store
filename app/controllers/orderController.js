const Book = require('../models/bookModel');
const Order = require('../models/orderModel');

exports.getOrders = (req, res, next) => { 
    Order.find()
    .select('_id book quantity')
    .populate('book', 'title author price')
    .then(orders => {
        if(!orders){
            res.status(404).json({
                message: 'You do not have any order at this moment',
            })
        }
        const response = {
            count: orders.length,
            orders: orders.map(order => {
                return {
                    _id: order.id,
                    book: order.book,
                    quantity: order.quantity,
                    request:{
                        type: 'GET',
                        url: 'http://localhost:3000/orders/' + order.id
                    }
                }
            })
        }
        res.status(200).json({
            message: 'Here is a list of all of your orders',
            response
        })
    })
    .catch((err) => {
        res.status(500).json({
            error: err
        })
    });
}

exports.createOrder = (req, res, next) => {
    const book_id = req.body.bookId;
    Book.findById(book_id)
    .then(book => {
        const order = new Order({
            book: req.body.bookId,
            quantity: req.body.quantity
        })
        return order.save()
    })
    .then(result => {
        res.status(200).json({
            message: 'Order was created successfully',
            result:{
                _id: result.id,
                book: result.book,
                quantity: result.quantity,
                request:{
                    type: 'GET',
                    url: 'http://localhost:3000/orders/' + result.id
                }
            }
        })
    })
    .catch((err) => {
        res.status(500).json({
            error: err
        })
    });
}

exports.getSIngleOrder = (req, res, next) => {
    const order_id = req.params.orderId;
    Order.findById(order_id)
    .populate('book', 'title price author')
    .then(order => {
        if(!order){
            res.status(404).json({message: 'The requested order has been deleted from the inventory'})
        }
        res.status(200).json({
            message: 'information on the selected order',
            order:{
                _id: order.id,
                book: order.book,
                quantity: order.quantity,
                request:{
                    type: 'GET',
                    url: 'http://localhost:3000/orders/' + order.id
                }
            }
        })
    })
    .catch((err) => {
        res.status(500).json({
            error: err
        })
    });
}

exports.deleteOrder = (req, res, next) => {
    const order_id = req.params.orderId;
    Order.remove({_id: order_id})
    .then(result => {
        res.status(200).json({
            message: 'Order has been deleted successfully',
            request:{
                type: 'POST',
                url: 'http://localhost:3000/orders',
                body:{
                    book: 'ID',
                    quantity: 'Number'
                }
            }
        })
    })
    .catch((err) => {
        res.status(500).json({
            error: err
        })
    });
}
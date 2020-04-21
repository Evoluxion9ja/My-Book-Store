const express = require('express');
const orderController = require('../controllers/orderController');
const Router = express.Router();

Router.get('/', orderController.getOrders);
Router.post('/', orderController.createOrder);
Router.get('/:orderId', orderController.getSIngleOrder);
Router.delete('/:orderId', orderController.deleteOrder);

module.exports = Router;
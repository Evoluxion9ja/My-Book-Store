const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const orderSchema = new Schema({
    book:{
        type: Schema.Types.ObjectId,
        ref: 'Book',
        required: true
    },
    quantity:{
        type: Number,
        default: 1
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('Order', orderSchema);
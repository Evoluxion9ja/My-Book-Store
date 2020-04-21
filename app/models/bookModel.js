const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const bookSchema = new Schema({
    title:{
        type: String,
        required: true
    },
    author:{
        type: String,
        required: true
    },
    ISBN:{
        type: Number,
        default: Math.random(20)
    },
    price:{
        type: Number,
        required: true
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('Book', bookSchema);
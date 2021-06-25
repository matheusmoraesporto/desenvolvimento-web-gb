const mongoose = require('mongoose');

const ProductCart = new mongoose.Schema({
    description: {
        type: String,
        required: true
    },
    img: {
        type: String,
        required: true
    },
    value: {
        type: Number,
        required: true
    },
    productCode: {
        type: String,
        required: true
    },
    idProduct: {
        type: Number,
        required: true
    },
    idUser: {
        type: String,
        required: true
    },
    quantity: {
        type: Number,
        required: true
    }
});

module.exports = ProductCart;
const mongoose = require('mongoose');

const CartSchema = new mongoose.Schema({
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

const Cart = mongoose.model('Cart', CartSchema);

module.exports = Cart;
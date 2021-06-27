const mongoose = require('mongoose');

const OrderSchema = mongoose.Schema({
    idUser: {
        type: String,
        required: true
    },
    total: {
        type: Number,
        required: true
    },
    numOrder: {
        type: String,
        required: true
    },
    bankSlip: {
        type: String,
        required: true
    },
    dateFinish: {
        type: Date,
        required: true
    }
});

const Order = mongoose.model('Order', OrderSchema);

module.exports = Order;
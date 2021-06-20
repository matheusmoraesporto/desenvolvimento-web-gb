const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema({
    id: {
        type: Number,
        required: true
    },
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
    branch: {
        type: String,
        required: true
    },
    type: {
        type: String,
        required: true
    },
    productCode: {
        type: String,
        required: true
    }
});

const Product = mongoose.model('Product', ProductSchema);

module.exports = Product;
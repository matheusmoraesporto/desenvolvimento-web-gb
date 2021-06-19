const mongoose = require('mongoose');

const FilterDetail = new mongoose.Schema({
    type: {
        type: String,
        required: true,
        lowercase: true
    },
    description: {
        type: String,
        required: true
    }
});

module.exports = FilterDetail;
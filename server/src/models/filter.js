const mongoose = require('../database');

const FilterSchema = new mongoose.Schema({
    type: {
        type: Boolean,
        require: true
    },
    typeDescription: {
        type: String,
        require: true
    },
    filterDetail: [{}]
});

const Filter = mongoose.model('Filter', FilterSchema);

module.exports = Filter;
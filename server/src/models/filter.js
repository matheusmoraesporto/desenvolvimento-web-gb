const mongoose = require('../database');

const FilterDetail = require('./utils/FilterDetail');

const FilterSchema = new mongoose.Schema({
    type: {
        type: Boolean,
        require: true
    },
    typeDescription: {
        type: String,
        require: true
    },
    filterDetail: [FilterDetail]
});

const Filter = mongoose.model('Filter', FilterSchema);

module.exports = Filter;
const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/jmgames', { useMongoClient: true });

mongoose.Promise = global.Promise;

module.exports = mongoose;
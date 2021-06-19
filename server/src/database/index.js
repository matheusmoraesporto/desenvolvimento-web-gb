const mongoose = require('mongoose');

mongoose.connect('mongodb+srv://matheusjennifer:imortal99@jmgames.qqtbu.mongodb.net/test', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

mongoose.Promise = global.Promise;

module.exports = mongoose;
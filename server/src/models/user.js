const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    avatar: {
        type: String,
        required: false
    },
    id: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: false
    }
});

const User = mongoose.model('User', UserSchema);

module.exports = User;
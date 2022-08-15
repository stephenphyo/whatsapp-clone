const mongoose = require('mongoose');

let usersSchema = mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    userID: {
        type: String,
        required: true,
        unique: true
    },
    memberOf: {
        type: Array
    },
    friends: {
        type: Array
    }
});

module.exports = mongoose.model('User', usersSchema);
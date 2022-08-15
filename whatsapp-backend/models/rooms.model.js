const mongoose = require('mongoose');

let roomSchema = mongoose.Schema({
    roomID: {
        type: String,
        required: true,
        unique: true
    },
    roomName: {
        type: String,
        required: true
    },
    owner: String,
    members: Array,
    createdDate: String,
    groupLogo: String
});

module.exports = mongoose.model('Room', roomSchema);
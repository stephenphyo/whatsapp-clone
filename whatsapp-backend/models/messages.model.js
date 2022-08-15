const mongoose = require("mongoose");

let messageSchema = mongoose.Schema({
    userID: String,
    username: String,
    message: String,
    timestamp: String,
    sent: Boolean,
    roomID: String
});

module.exports = mongoose.model('Message', messageSchema);
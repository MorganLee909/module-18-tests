const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
    username: String,
    email: String,
    thoughts: [],
    friends: []
});

module.exports = mongoose.model("User", UserSchema);
const mongoose = require("mongoose");

const ThoughtSchema = new mongoose.Schema({
    thoughtText: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        required: true
    },
    reactions: []
});

module.exports = mongoose.model("Thought", ThoughtSchema);
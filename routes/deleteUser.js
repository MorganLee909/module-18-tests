const axios = require("axios");

const User = require("../models/user.js");
const Thought = require("../models/thought.js");

module.exports = {
    run: async function(userId){
        return await axios({
            url: `http://localhost:8000/api/users/${userId}`,
            method: "delete"
        });
    },

    test: async function(user){
        let dbUser = await User.findOne({_id: user._id});
        let thoughts = await Thought.find({_id: user.thoughts});
        
        if(dbUser !== null) console.error("DELETE USER: User not removed from database.");

        if(thoughts.length === 0) console.error("BONUS: Deleting user also deletes user's thoughts");
    }
}
const axios = require("axios");

const Thought = require("../models/thought.js");
const User = require("../models/user.js");

module.exports = {
    run: async function(thoughtId){
        return await axios({
            url: `http://localhost:8000/api/thoughts/${thoughtId}`,
            method: "delete"
        });
    },

    test: async function(thoughtId){
        let thought = await Thought.findOne({_id: thoughtId});
        let users = await User.find({});

        if(thought !== null) console.error("DELETE THOUGHT: Thought not removed from database");

        let existsOnUser = false;
        for(let i = 0; i < users.length; i++){
            for(let j = 0; j < users[i].thoughts.length; j++){
                if(users[i].thoughts[j].toString() === thoughtId){
                    existsOnUser = true;
                    console.error("DELETE THOUGHT: Thought not removed from user's thought array");
                    break;
                }
            }
            if(existsOnUser) break;
        }
    }
}
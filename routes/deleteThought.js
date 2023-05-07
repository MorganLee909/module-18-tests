const axios = require("axios");

const Thought = require("../models/thought.js");
const User = require("../models/user.js");

const {createThought, clearDb} = require("../testData.js");

module.exports = {
    setup: async function(){
        let thoughtProms = [];

        for(let i = 0; i < 5; i++){
            thoughtProms.push(createThought());
        }

        return await Promise.all(thoughtProms);
    },

    run: async function(thoughtId){
        let data = await this.setup();
        let users = [];
        let thoughts = [];
        for(let i = 0; i < data.length; i++){
            users.push(data[i].user);
            thoughts.push(data[i].thought);
        }

        let rand = Math.floor(Math.random * thoughts.length);
        let thought = thoughts[rand];

        await axios({
            url: `http://localhost:8000/api/thoughts/${thought._id.toString()}`,
            method: "delete"
        });

        await this.test(thought._id, users[rand]._id);
    },

    test: async function(thoughtId, userId){
        let thought = await Thought.findOne({_id: thoughtId});
        let user = await User.findOne({_id: userId});

        try{
            if(thought !== null) console.error("DELETE THOUGHT: Thought not deleted");
            if(user.thoughts[0].toString() === thoughtId.toString()) console.error("DELETE THOUGHT: Thought not removed from user");
        }catch(e){}

        await clearDb();
    }
}
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

        let data = await Promise.all(thoughtProms);
        let thoughts = [];
        let users = [];
        for(let i = 0; i < data.length; i++){
            thoughts.push(data[i].thought);
            users.push(data[i].user);
        }

        return {thoughts, users};
    },

    run: async function(){
        let {thoughts, users} = await this.setup();
        let rand = Math.floor(Math.random() * thoughts.length);
        let thought = thoughts[rand];

        try{
            await axios({
                url: `http://localhost:8000/api/thoughts/${thought._id.toString()}`,
                method: "delete",
                timeout: 1000
            });
        }catch(e){
            // let data = e.response ? e.response.data : "error";
            // console.error("DELETE THOUGHT (response):", data);
        }

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
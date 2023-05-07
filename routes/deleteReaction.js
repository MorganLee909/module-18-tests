const axios = require("axios");

const Thought = require("../models/thought.js");

const {createThought, clearDb} = require("../testData.js");

module.exports = {
    setup: async function(){
        let thoughtProms = [];

        for(let i = 0; i < 5; i++){
            thoughtProms.push(createThought(true));
        }

        return await Promise.all(thoughtProms);
    },

    run: async function(thoughtId, reactionId){
        let thoughts = await this.setup();

        let rand = Math.floor(Math.random() * thoughts.length);
        let thought = thoughts[rand];
        rand = Math.floor(Math.random() * thought.reactions.length);


        await axios({
            url: `http://localhost:8000/api/thoughts/${thought._id.toString()}/reactions/${thought.reactions[rand].reactionId.toString()}`,
            method: "delete"
        });

        await this.test(thought, thought.reactions[rand]._id);
    },

    test: async function(thought, reactionId){
        let dbThought = await Thought.findOne({_id: thought._id});

        try{
            if(thought.reactions.length === dbThought.reactions.length) console.error("DELETE REACTION: Thought array size unchanged");

            for(let i = 0; i < thought.reactions.length; i++){
                if(dbThought.reactions[i].reactionId.toString() === reactionId.toString()){
                    console.error("DELETE REACTION: Reaction still in thought object");
                }
            }
        }catch(e){}

        await clearDb();
    }
}
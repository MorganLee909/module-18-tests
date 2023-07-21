const axios = require("axios");

const Thought = require("../models/thought.js");

const {createThought, clearDb} = require("../testData.js");

module.exports = {
    reactionBody: "If you must break the law, do it to seize power: in all other cases, observe it",
    username: "Gaius Julius Caesar",

    setup: async function(){
        return await createThought();
    },

    run: async function(){
        let {thought} = await this.setup();

        try{
            await axios({
                url: `http://localhost:8000/api/thoughts/${thought._id.toString()}/reactions`,
                method: "post",
                timeout: 1000,
                data: {
                    reactionBody: this.reactionBody,
                    username: this.username
                }
            });
        }catch(e){
            // let data = e.response ? e.response.data : "error";
            // console.error("CREATE REACTION (response):", data);
        }

        await this.test(thought._id.toString());
    },

    test: async function(id){
        let thought = await Thought.findOne({_id: id});

        try{
            //Check that reaction is saved to thought
            if(thought.reactions.length === 0) console.error("CREATE REACTION: Reaction not added to thought");
            
            //check that reaction has correct data
            if(thought.reactions[0].reactionBody !== this.reactionBody) console.error("CREATE REACTION: reaction body not saved properly");
            if(thought.reactions[0].username !== this.username) console.error("CREATE REACTION: username not saved properly");
        }catch(e){}

        await clearDb();
    }
}
const axios = require("axios");

const Thought = require("../models/thought.js");

const {createThought, clearDb} = require("../testData.js");

module.exports = {
    thoughtText: "Greed is but a word jealous men inflict upon the ambitious",
    username: "Marcus Licinius Crassus",

    setup: async function(){
        return await createThought();
    },

    run: async function(){
        let {thought} = await this.setup();

        let response = {};
        try{
            response = await axios({
                url: `http://localhost:8000/api/thoughts/${thought._id.toString()}`,
                method: "put",
                timeout: 1000,
                data: {
                    thoughtText: this.thoughtText,
                    username: this.username
                }
            });
        }catch(e){
            // let data = e.response ? e.response.data : "error";
            // console.error("UPDATE THOUGHT (response):", data);
        }

        await this.test(response.data, thought._id);
    },
    
    test: async function(response, thoughtId){
        let thought = await Thought.findOne({_id: thoughtId});

        try{
            if(thought.thoughtText !== this.thoughtText) console.error("UPDATE THOUGHT: Thought text not updated");
            if(thought.username !== this.username) console.error("UPDATE THOUGHT: Username not updated");
        }catch(e){}

        try{
            new Thought(response);
        }catch(e){
            console.error("UPDATE THOUGHT: Response does not contain thought data");
        }

        await clearDb();
    }
}
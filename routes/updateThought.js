const axios = require("axios");

const Thought = require("../models/thought.js");

module.exports = {
    thoughtText: "Greed is but a word jealous men inflict upon the ambitious",
    username: "Marcus Licinius Crassus",

    run: async function(thoughtId){
        return await axios({
            url: `http://localhost:8000/api/thoughts/${thoughtId}`,
            method: "put",
            data: {
                thoughtText: this.thoughtText,
                username: this.username
            }
        });
    },
    
    test: function(response, thought){
        if(thought.thoughtText !== this.thoughtText) console.error("UPDATE THOUGHT: Thought text not updated");
        if(thought.username !== this.username) console.error("UPDATE THOUGHT: Username not updated");

        try{
            new Thought(thought);
        }catch(e){
            console.error("UPDATE THOUGHT: Response does not contain thought data");
        }
    }
}
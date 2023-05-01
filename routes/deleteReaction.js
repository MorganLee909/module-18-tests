const axios = require("axios");

module.exports = {
    run: async function(thoughtId, reactionId){
        return await axios({
            url: `http://localhost:8000/api/thoughts/${thoughtId}/reactions/${reactionId}`,
            method: "delete"
        });
    },

    test: function(thought, reactionId){
        if(thought.reactions.length === 0) return;

        let reactionExists = false;
        for(let i = 0; i < thought.reactions.length; i++){
            if(thought.reactions[i].reactionId === reactionId){
                reactionExists = true;
                break;
            }
        }

        if(reactionExists) console.error("DELETE REACTION: Reaction not removed from thought");
    }
}
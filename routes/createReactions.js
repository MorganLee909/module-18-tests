const axios = require("axios");

module.exports = {
    run: async function(thoughtIds){
        let promises = [];

        promises.push(axios({
            url: `http://localhost:8000/api/thoughts/${thoughtIds[0]}/reactions`,
            method: "post",
            data: {
                reactionBody: "If you must break the law, do it to seize power: in all other cases, observe it",
                username: "Gaius Julius Caesar"
            }
        }));

        promises.push(axios({
            url: `http://localhost:8000/api/thoughts/${thoughtIds[0]}/reactions`,
            method: "post",
            data: {
                reactionBody: "The difference between a republic and an empire is the loyalty of one's army",
                username: "Gaius Julius Caesar"
            }
        }));
        
        promises.push(axios({
            url: `http://localhost:8000/api/thoughts/${thoughtIds[1]}/reactions`,
            method: "post",
            data: {
                reactionBody: "Without training, they lacked knowledge. Without knowledge, they lacked confidence. Without confidence, they lacked victory",
                username: "Gaius Julius Caesar"
            }
        }));

        return Promise.all(promises);
    },

    test: function(thoughts){
        //Check on basic data
        if(thoughts[0].reactions.length === 0) console.error("CREATE REACTION: Reaction not added to thought");
        if(thoughts[0].reactions.length === 1) console.error("CREATE REACTION: Only one reaction added to thought");
        if(thoughts[1].reactions.length === 0) console.error("CREATE REACTION: Reaction not added to second thought");
        if(thoughts[0].reactions[0].username !== "Gaius Julius Caesar") console.error("CREATE REACTION: Reaction username incorrect");
        if(typeof thoughts[0].reactions[0].reactionBody !== "string" || thoughts[0].reactions[0].reactionBody.length === 0) console.error("CREATE REACTION: Reaction text incorrect");
    }
}
const axios = require("axios");

const Thought = require("../models/thought.js");

module.exports = {
    run: async function(ids){
        let promises = [];

        promises.push(axios({
            url: "http://localhost:8000/api/thoughts",
            method: "post",
            data: {
                userId: ids[0],
                thoughtText: "No friend ever served me, and no enemy ever wronged me, whom I have not repaid in full.",
                username: "Sulla"
            }
        }));

        promises.push(axios({
            url: "http://localhost:8000/api/thoughts",
            method: "post",
            data: {
                userId: ids[1],
                thoughtText: "The law speaks too softly to be heard amidst the din of arms.",
                username: "Marius"
            }
        }));

        return Promise.all(promises);
    },

    test: function(response, thoughts, users){
        //Check for correct data
        if(thoughts[0].thoughtText.length <= 0) console.error("CREATE THOUGHT: Thought text not saved");
        if(thoughts[0].username.length <= 0) console.error("CREATE THOUGHT: Thought username not created");
        if(users[0].thoughts.length === 0 || users[1].thoughts.length === 0) console.error("CREATE THOUGHT: Thought ID not saved to user");
        

        //Check that ID saved to user's thoughts is valid Thought ID
        let valid = false;
        let userId = users[0].thoughts[0].toString();
        for(let i = 0; i < thoughts.length; i++){
            if(thoughts[i]._id.toString() === userId){
                valid = true;
                break;
            }
        }
        if(!valid) console.error("CREATE THOUGHT: Thought ID on user doesn't match any thought");
        
        //Check for valid date
        try{
            new Date(thoughts[0].createdAt);
        }catch(e){
            console.error("CREATE THOUGHT: Created at doesn't exist or is not a date");
        }

        //Check that response contains thought data
        try{
            new Thought(response[0]);
        }catch(e){
            console.error("CREATE THOUGHT: Thought creation does not respond with thought data.");
        }
    }
}
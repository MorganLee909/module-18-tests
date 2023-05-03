const axios = require("axios");

const Thought = require("../models/thought.js");

const {createUser, clearDb} = require("../testData.js");

module.exports = {
    setup: async function(){
        return [await createUser(), await createUser()];
    },

    run: async function(){
        let users = await this.setup();

        let response = axios({
            url: "http://localhost:8000/api/thoughts",
            method: "post",
            data: {
                userId: users[1]._id.toString(),
                thoughtText: "No friend ever served me, and no enemy ever wronged me, whom I have not repaid in full.",
                username: "Sulla"
            }
        });

        await this.test(response.data, users[1]._id.toString());
    },

    test: async function(response, userId){
        let user = await User.findOne({_id: userId});
        let thought = await Thought.findOne({});

        //Check for correct data
        if(thought.thoughtText.length <= 0) console.error("CREATE THOUGHT: Thought text not saved");
        if(thought.username.length <= 0) console.error("CREATE THOUGHT: Thought username not saved");

        //Check that thought ID is saved to user
        if(user.thoughts.length === 0) console.error("CREATE THOUGHT: Thought ID not saved to user");

        //Check that ID saved to user's thoughts is valid Thought ID
        if(user.thoughts[0].toString() !== thought._id.toString()) console.errror("CREATE THOUGHT: Thought ID on user doesn't match thought");
        
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

        clearDb();
    }
}
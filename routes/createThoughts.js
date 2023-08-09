const axios = require("axios");

const User = require("../models/user.js");
const Thought = require("../models/thought.js");

const {createUser, clearDb} = require("../testData.js");

module.exports = {
    setup: async function(){
        return [await createUser(), await createUser()];
    },

    run: async function(){
        let users = await this.setup();
        let response = {};
        try{
            response = await axios({
                url: "http://localhost:8000/api/thoughts",
                method: "post",
                timeout: 1000,
                data: {
                    userId: users[1]._id.toString(),
                    thoughtText: "No friend ever served me, and no enemy ever wronged me, whom I have not repaid in full.",
                    username: "Sulla"
                }
            });
        }catch(e){
            // let data = e.response ? e.response.data : "error";
            // console.error("CREATE THOUGHT (response):", data);
        }

        await this.test(response.data, users[1]._id.toString());
    },

    test: async function(response, userId){
        let user = await User.findOne({_id: userId});
        let thought = await Thought.findOne({});

        if(thought === null) console.error("CREATE THOUGHT: Not created");

        try{
            //Check for correct data
            if(thought.thoughtText.length <= 0) console.error("CREATE THOUGHT: Thought text not saved");
            if(thought.username.length <= 0) console.error("CREATE THOUGHT: Thought username not saved");

            //Check that thought ID is saved to user
            if(user.thoughts.length === 0) console.error("CREATE THOUGHT: Thought ID not saved to user");
        }catch(e){}

        //Check that response contains thought data
        try{
            if(!response._id) console.error("CREATE THOUGHT: Thought creation does not respond with thought data.");
        }catch(e){}

        console.log();
        await clearDb();
    }
}
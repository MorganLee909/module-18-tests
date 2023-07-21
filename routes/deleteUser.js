const axios = require("axios");

const User = require("../models/user.js");
const Thought = require("../models/thought.js");

const {createThought, clearDb} = require("../testData.js");

module.exports = {
    setup: async function(){
        let thoughtProms = [];

        for(let i = 0; i < 5; i++){
            thoughtProms.push(createThought());
        }

        return await Promise.all(thoughtProms);
    },

    run: async function(){
        let data = await this.setup();
        let users = [];
        for(let i = 0; i < data.length; i++){
            users.push(data[i].user);
        }
        let rand = Math.floor(Math.random() * data.length);

        try{
            await axios({
                url: `http://localhost:8000/api/users/${users[rand]._id.toString()}`,
                method: "delete",
                timeout: 1000
            });
        }catch(e){
            // let data = e.response ? e.response.data : "error";
            // console.error("DELETE USER (response):", data);
        }

        await this.test(users[rand]._id, users[rand].thoughts[0]);
    },

    test: async function(userId, thoughtId){
        let user = await User.findOne({_id: userId});
        let thought = await Thought.findOne({_id: thoughtId});
        
        try{
            if(user !== null) console.error("DELETE USER: User not removed from database.");
            if(thought === null) console.error("BONUS: Deleting user also deletes user's thoughts");
        }catch(e){}

        await clearDb();
    }
}
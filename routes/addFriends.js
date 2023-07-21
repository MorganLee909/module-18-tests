const axios = require("axios");

const User = require("../models/user.js");

const {createUser, clearDb} = require("../testData.js");

module.exports = {
    setup: async function(){
        return [await createUser(), await createUser()];
    },

    run: async function(){
        let users = await this.setup();

        try{
            await axios({
                url: `http://localhost:8000/api/users/${users[0]._id.toString()}/friends/${users[1]._id.toString()}`,
                method: "post",
                timeout: 1000
            });
        }catch(e){
            // let data = e.response ? e.response.data : "error";
            // console.error("ADD FRIEND (response):", data);
        }

        await this.test(users[0]._id, users[1]._id);
    },

    test: async function(userId, friendId){
        let user = await User.findOne({_id: userId});
        let friend = await User.findOne({_id: friendId});
        
        try{
            if(user.friends.length === 0) console.error("ADD FRIEND: Friend not added to user");
            if(user.friends[0]._id.toString() !== friend._id.toString()) console.error("ADD FRIEND: Incorrect ID added to friends list");
        }catch(e){}

        await clearDb();
    }
}
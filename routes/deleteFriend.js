const axios = require("axios");

const User = require("../models/user.js");

const {createUser, clearDb} = require("../testData.js");

module.exports = {
    setup: async function(){
        let users = [await createUser(), await createUser()];

        users[0].friends.push(users[1]._id);
        await users[0].save();

        return users;
    },

    run: async function(){
        let users = await this.setup();

        try{
            await axios({
                url: `http://localhost:8000/api/users/${users[0]._id.toString()}/friends/${users[1]._id.toString()}`,
                method: "delete",
                timeout: 1000
            });    
        }catch(e){}

        await this.test(users);
    },

    test: async function(users){
        let user = await User.findOne({_id: users[0]._id});

        for(let i = 0; i < user.friends.length; i++){
            if(user.friends[i].toString() === users[1]._id.toString()){
                console.error("DELETE FRIEND: Friend id not removed from user");
                break;
            }
        }

        console.log();
        await clearDb();
    }
}
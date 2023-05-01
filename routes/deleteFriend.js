const axios = require("axios");

const User = require("../models/user.js");

module.exports = {
    run: async function(userId, friendId){
        return await axios({
            url: `http://localhost:8000/api/users/${userId}/friends/${friendId}`,
            method: "delete"
        });
    },

    test: async function(userId, friendId){
        let user = await User.findOne({_id: userId});

        if(user.friends.length === 0) return;

        for(let i = 0; i < user.friends.length; i++){
            if(user.friends[i].toString() === friendId){
                console.error("DELETE FRIEND: Friend not removed");
                break;
            }
        }
    }
}
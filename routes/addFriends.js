const axios = require("axios");

module.exports = {
    run: async function(userIds){
        return await axios({
            url: `http://localhost:8000/api/users/${userIds[0]}/friends/${userIds[1]}`,
            method: "post"
        });
    },

    test: function(users){
        if(users[0].friends.length === 0) console.error("ADD FRIEND: Friend not added to user");
        if(users[0].friends[0]._id.toString() !== users[1]._id.toString()) console.error("ADD FRIEND: Incorrect ID added to friends list");
    }
}
const axios = require("axios");

const User = require("../models/user.js");

module.exports = {
    run: async function(userId){
        return await axios({
            url: `http://localhost:8000/api/users/${userId}`,
            method: "put",
            data: {
                username: "Marius",
                email: "gaius@mail.com"
            }
        });
    },

    test: function(response, user){
        if(user.username !== "Marius") console.error("UPDATE USER: username not updated");
        if(user.email !== "gaius@mail.com") console.error("UPDATE USER: email not updated");

        try{
            new User(response);
        }catch(e){
            console.error("UPDATE USER: response does not contain user data");
        }
    }
}
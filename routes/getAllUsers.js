const axios = require("axios");

const User = require("../models/user.js");

module.exports = {
    run: async function(){
        return await axios({
            url: "http://localhost:8000/api/users",
            method: "get"
        });
    },

    test: function(response, users){
        if(response.length === 0) console.error("GET ALL USERS: Empty response");
        if(response.length !== users.length) console.error("GET ALL USERS: Response does not match database contents");
        
        try{
            new User(response[0]);
        }catch(e){
            console.error("GET ALL USERS: Response does not contain users");
        }
    }
}
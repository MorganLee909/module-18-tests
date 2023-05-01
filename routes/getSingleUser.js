const axios = require("axios");

module.exports = {
    run: async function(userId){        
        return await axios({
            url: `http://localhost:8000/api/users/${userId}`,
            method: "get"
        });
    },

    test: function(response, user){
        if(response._id.toString() !== user._id.toString()) console.error("GET SINGLE USER: Response does not match user requested");
    }
}
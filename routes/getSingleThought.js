const axios = require("axios");

module.exports = {
    run: async function(thoughtId){
        return await axios({
            url: `http://localhost:8000/api/thoughts/${thoughtId}`,
            method: "get"
        });
    },

    test: function(response, thought){
        if(response._id.toString() !== thought._id.toString()) console.error("GET SINGLE THOUGHT: Response does not match thought");
    }
}
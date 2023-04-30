const axios = require("axios");

const Thought = require("../models/thought.js");

module.exports = {
    run: async function(){
        return await axios({
            url: "http://localhost:8000/api/thoughts",
            method: "get"
        });
    },

    test: function(response, thoughts){
        //Check basic data
        if(response.length === 0) console.error("GET ALL THOUGHTS: Empty response");
        if(response.length !== thoughts.length) console.error("GET ALL THOUGHTS: Response does not match database contents");

        try{
            new Thought(response[0]);
        }catch(e){
            console.error("GET ALL THOUGHTS: Response does not contain thought objects")
        }
    }
}
const axios = require("axios");

const {createThought, clearDb} = require("../testData.js");

module.exports = {
    setup: async function(){
        let thoughtProms = [];

        for(let i = 0; i < 5; i++){
            thoughtProms.push(createUser());
        }

        return await Promise.all(thoughtProms);
    },

    run: async function(){
        thoughts = this.setup();

        let rand = Math.floor(Math.random * thoughts.length);
        let testThought = thoughts[rand];

        let response =  await axios({
            url: `http://localhost:8000/api/thoughts/${testThought._id.toString()}`,
            method: "get"
        });

        this.test(response, testThought);
    },

    test: function(response, thought){
        if(response._id.toString() !== thought._id.toString()) console.error("GET SINGLE THOUGHT: Response does not match thought");
    }
}
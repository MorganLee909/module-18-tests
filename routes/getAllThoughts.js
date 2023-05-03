const axios = require("axios");

const Thought = require("../models/thought.js");

const {createThought, clearDb} = require("../testData.js");

module.exports = {
    setup: async function(){
        let promises = [];

        for(let i = 0; i < 5; i++){
            let {thought} = await createThought();
            promises.push(thought);
        }

        return promises;
    },

    run: async function(){
        let thoughts = await this.setup();

        let response = await axios({
            url: "http://localhost:8000/api/thoughts",
            method: "get"
        });

        let rand = Math.floor(Math.random() * thoughts.length);
        await this.test(response.data, thoughts[rand]._id);
    },

    test: async function(response, randThoughtId){
        let thoughts = await Thought.find({});
        let dbThought = await Thought.findOne({_id: randThoughtId});

        //Check response data
        if(response.length === 0) console.error("GET ALL THOUGHTS: Empty response");
        if(response.length !== thoughts.length) console.error("GET ALL THOUGHTS: Response does not match database contents");

        //Check data of random thought
        let responseThought = response.find(r => r._id.toString() === dbThought._id.toString());
        if(!responseThought) console.error("GET ALL THOUGHTS: Cannot find test thought in response");
        if(responseThought.thoughtText !== dbThought.thoughtText) console.error("GET ALL THOUGHTS: Test thought text does not match database");
        if(responseThought.username !== dbThought.username) console.error("GET ALL THOUGHT: Test thought username does not match database");

        //Check that response contains valid thoughts
        try{
            new Thought(response[0]);
        }catch(e){
            console.error("GET ALL THOUGHTS: Response does not contain thought objects")
        }

        await clearDb();
    }
}
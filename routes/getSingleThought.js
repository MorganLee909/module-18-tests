const axios = require("axios");

const {createThought, clearDb} = require("../testData.js");

module.exports = {
    setup: async function(){
        let thoughtProms = [];

        for(let i = 0; i < 5; i++){
            thoughtProms.push(createThought());
        }



        let data = await Promise.all(thoughtProms);
        let thoughts = [];
        for(let i = 0; i < data.length; i++){
            thoughts.push(data[i].thought);
        }
        return thoughts;
    },

    run: async function(){
        let thoughts = await this.setup();
        let rand = Math.floor(Math.random() * thoughts.length);
        let testThought = thoughts[rand];

        let response = {};
        try{
            response =  await axios({
                url: `http://localhost:8000/api/thoughts/${testThought._id.toString()}`,
                method: "get",
                timeout: 1000
            });    
        }catch(e){
            // let data = e.response ? e.response.data : "error";
            // console.error("GET SINGLE THOUGHT (response):", data);
        }

        await this.test(response.data, testThought);
    },

    test: async function(response, thought){
        try{
            if(response._id.toString() !== thought._id.toString()) console.error("GET SINGLE THOUGHT: Response does not match thought");
        }catch(e){}

        await clearDb();
    }
}
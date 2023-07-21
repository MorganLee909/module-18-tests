const axios = require("axios");

const User = require("../models/user.js");

const {createUser, clearDb} = require("../testData.js");

module.exports = {
    setup: async function(){
        let users = [];

        for(let i = 0; i < 5; i++){
            users.push(createUser());
        }

        return await Promise.all(users);
    },

    run: async function(){
        let users = await this.setup();
        let rand = Math.floor(Math.random() * users.length);

        let response = {};
        try{
            response = await axios({
                url: `http://localhost:8000/api/users/${users[rand]._id.toString()}`,
                method: "get",
                timeout: 1000
            });
        }catch(e){
            // let data = e.response ? e.response.data : "error";
            // console.error("GET SINGLE USER (response):", data);
        }

        await this.test(response.data, users[rand]._id);
    },

    test: async function(response, testUserId){
        let user = await User.findOne({_id: testUserId});

        try{
            //Check that we did not recieve an array
            if(response.length !== undefined) console.error("GET SINGLE USER: response is an array");

            //Check matching ids
            if(response._id.toString() !== user._id.toString()) console.error("GET SINGLE USER: Response does not match user requested");

            //Check that data matches
            if(response.username !== user.username) console.error("GET SINGLE USER: Username does not match");
            if(response.email !== user.email) console.error("GET SINGLE USER: Email does not match");
        }catch(e){}

        await clearDb();
    }
}
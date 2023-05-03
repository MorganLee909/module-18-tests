const axios = require("axios");

const User = require("../models/user.js");

const {createUser, clearDb} = require("../testData.js");

module.exports = {
    setup: async function(){
        return [await createUser(), await createUser(), await createUser()];
    },

    run: async function(){
        let users = await this.setup();

        let response = await axios({
            url: "http://localhost:8000/api/users",
            method: "get"
        });

        let rand = Math.floor(Math.random() * users.length);
        await this.test(response.data, users[rand]._id)
    },

    test: async function(response, testUser){
        try{
            let users = await User.find({});
            let dbUser = await User.findOne({_id: testUser});

            //Check basic data
            if(response.length === 0) console.error("GET ALL USERS: Empty response");
            if(response.length !== users.length) console.error("GET ALL USERS: Response does not match database contents");

            //Check data for one user
            let responseUser = null;
            for(let i = 0; i < response.length; i++){
                if(response[i]._id.toString() === dbUser._id.toString()){
                    responseUser = response[i];
                    break;
                }
            }

            if(responseUser === null) console.error("GET ALL USERS: Cannot find test user");
            if(responseUser.username !== dbUser.username) console.error("GET ALL USERS: Response username does not match database");
            if(responseUser.email !== dbUser.email) console.error("GET ALL USERS: Response email does not match database");
        }catch(e){}

        try{
            new User(response[0]);
        }catch(e){
            console.error("GET ALL USERS: Response does not contain user objects");
        }

        await clearDb();
    }
}
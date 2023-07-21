const axios = require("axios");

const User = require("../models/user.js");

const {createUser, clearDb} = require("../testData.js");

module.exports = {
    username: "Marius",
    email: "gaius@mail.com",

    setup: async function(){
        return await createUser();
    },

    run: async function(){
        let user = await this.setup();

        let response = {};
        try{
            response = await axios({
                url: `http://localhost:8000/api/users/${(await user)._id.toString()}`,
                method: "put",
                timeout: 1000,
                data: {
                    username: this.username,
                    email: this.email
                }
            });

        }catch(e){
            // let data = e.response ? e.response.data : "error";
            // console.error("UPDATE USER (response):", data);
        }

        await this.test(response.data, user._id);
    },

    test: async function(response, userId){
        let user = await User.findOne({_id: userId});

        //Check data is updated
        try{
            if(user.username !== this.username) console.error("UPDATE USER: username not updated");
            if(user.email !== this.email) console.error("UPDATE USER: email not updated");
        }catch(e){}
            
        //Check response is valid user
        try{
            new User(response);
        }catch(e){
            console.error("UPDATE USER: response does not contain user data");
        }

        await clearDb();
    }
}
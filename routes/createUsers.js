const axios = require("axios");

const User = require("../models/user.js");

const {clearDb} = require("../testData.js");

module.exports = {
    run: async function(){
        let response = await axios({
            url: "http://localhost:8000/api/users",
            method: "post",
            data: {
                username: "Lucius Cornelius Sulla Felix",
                email: "sulla@mail.com"
            }
        });

        await this.test(response.data);
    },

    test: async function(response){
        let user = await User.find({});

        try{
            if(users.length < 1) console.error("CREATE USER: User not added to database");
            if(user.username !== "Lucius Cornelius Sulla Felix") console.error("CREATE USER: Username incorrect");
            if(user.email !== "sulla@mail.com") console.error("CREATE USER: Email incorrect");
        }catch(e){};

        try{
            new User(response);
        }catch(e){
            console.error("CREATE USER: User creation does not respond with user data");
        }

        await clearDb();
    }
}
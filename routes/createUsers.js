const axios = require("axios");

const User = require("../models/user.js");

const {clearDb} = require("../testData.js");

module.exports = {
    //No setup needed
    run: async function(){
        let response = {};
        try{
            response = await axios({
                url: "http://localhost:8000/api/users",
                method: "post",
                timeout: 1000,
                data: {
                    username: "Lucius Cornelius Sulla Felix",
                    email: "sulla@mail.com"
                }
            });
        }catch(e){}

        await this.test(response.data);
    },

    test: async function(response){
        let users = await User.find({});

        try{
            if(users.length < 1) console.error("CREATE USER: User not added to database");
            if(users[0].username !== "Lucius Cornelius Sulla Felix") console.error("CREATE USER: Username incorrect");
            if(user[0].email !== "sulla@mail.com") console.error("CREATE USER: Email incorrect");
        }catch(e){};

        try{
            if(!response._id) console.error("CREATE USER: User creation does not respond with user data");
            new User(response);
        }catch(e){}

        console.log();
        await clearDb();
    }
}
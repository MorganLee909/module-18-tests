const axios = require("axios");

const User = require("../models/user.js");

module.exports = {
    run: async function(){
        let promises = [];

        promises.push(axios({
            url: "http://localhost:8000/api/users",
            method: "post",
            data: {
                username: "Lucius Cornelius Sulla Felix",
                email: "sulla@mail.com"
            }
        }));

        promises.push(axios({
            url: "http://localhost:8000/api/users",
            method: "post",
            data: {
                username: "Gaius Marius",
                email: "marius@mail.com"
            }
        }));

        return Promise.all(promises);
    },

    test: function(response, userData){
        if(userData.length === 0) console.error("CREATE USER: Users not added to database");
        if(userData.length < 2) console.error("CREATE USER: Only one user created");
        if(userData[0].username !== "Lucius Cornelius Sulla Felix") console.error("CREATE USER: Username incorrect");
        if(userData[0].email !== "sulla@mail.com") console.error("CREATE USER: Email incorrect");

        try{
            new User(response[0]);
        }catch(e){
            console.error("CREATE USER: User creation does not respond with user data");
        }
    }
}
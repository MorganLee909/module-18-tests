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

    test: function(response, dbData){
        if(dbData.length === 0) console.error("Users not added to database");
        if(dbData.length < 2) console.error("Only one user created");
        if(dbData[0].username !== "Lee Morgan") console.error("Username incorrect");
        if(dbData[0].email !== "me@leemorgan.io") console.error("Email incorrect");

        try{
            new User(response);
        }catch(e){
            console.error("User creation response is not User");
        }
    }
}
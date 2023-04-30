const axios = require("axios");
const mongoose = require("mongoose");

const User = require("./models/user.js");

const createUsers = require("./routes/createUsers.js");

mongoose.connect(`mongodb://127.0.0.1:27017/${process.argv[2]}`);

createUsers.run()
    .then((users)=>{
        let userData = [users[0].data, users[1].data];

        return Promise.all([userData, User.find({})]);
    })
    .then((data)=>{
        createUsers.test(data[0], data[1]);
    })
    .catch((err)=>{
        console.error(err);
    })
    .finally(()=>{
        mongoose.disconnect();
    })
const mongoose = require("mongoose");
const { faker } = require('@faker-js/faker');

const User = require("./models/user.js");

module.exports = {
    createUser: async function(){
        let user = new User({
            username: faker.internet.userName,
            email: faker.internet.email,
            thoughts: [],
            friends: []
        });

        await user.save();
        return user;
    },

    clearDb: async function(){
        await mongoose.connection.db.dropDatabase((err)=>{console.error(err)});
    }
}
const mongoose = require("mongoose");
const { faker } = require('@faker-js/faker');

const User = require("./models/user.js");
const Thought = require("./models/thought.js");

module.exports = {
    createUser: async function(){
        let user = new User({
            username: faker.internet.userName(),
            email: faker.internet.email(),
            thoughts: [],
            friends: []
        });

        await user.save();
        return user;
    },

    createThought: async function(reactions = false){
        let user = new User({
            username: faker.internet.userName(),
            email: faker.internet.email(),
            thoughts: [],
            friends: []
        });

        let thought = new Thought({
            thoughtText: faker.lorem.sentence(),
            username: faker.internet.userName(),
            createdAt: new Date(),
            reactions: []
        });

        if(reactions){
            let rand = Math.floor(Math.random() * 5) + 1;
            for(let i = 0; i < rand; i++){
                thought.push({
                    reactionId: new mongoose.Types.ObjectId(),
                    reactionBody: faker.lorem.sentence(),
                    username: faker.internet.userName(),
                    createdAt: new Date()
                });
            }
        }

        user.thoughts.push(thought._id);

        await Promise.all([user.save(), thought.save()]);
        return {user, thought};
    },

    clearDb: async function(){
        await mongoose.connection.db.dropDatabase((err)=>{console.error(err)});
    }
}
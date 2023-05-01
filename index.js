const mongoose = require("mongoose");

const User = require("./models/user.js");
const Thought = require("./models/thought.js");

const createUsers = require("./routes/createUsers.js");
const createThoughts = require("./routes/createThoughts.js");
const createReactions = require("./routes/createReactions.js");
const addFriends = require("./routes/addFriends.js");
const updateUser = require("./routes/updateUser.js");
const updateThought = require("./routes/updateThought.js");
const getAllUsers = require("./routes/getAllUsers.js");
const getAllThoughts = require("./routes/getAllThoughts.js");
const getSingleUser = require("./routes/getSingleUser.js");
const getSingleThought = require("./routes/getSingleThought.js");
const deleteReaction = require("./routes/deleteReaction.js");

mongoose.connect(`mongodb://127.0.0.1:27017/${process.argv[2]}`);

let deleteReactionTest = async ()=>{
    let thoughts = await Thought.find({});

    let thoughtId = "";
    let reactionId = "";

    for(let i = thoughts.length - 1; i >= 0; i--){
        if(thoughts[i].reactions.length > 0){
            thoughtId = thoughts[i]._id.toString();
            reactionId = thoughts[i].reactions[thoughts[i].reactions.length-1].reactionId;
            break;
        }
    }

    await deleteReaction.run(thoughtId, reactionId);
    let dbThought = await Thought.findOne({_id: thoughtId});
    deleteReaction.test(dbThought, reactionId);
}

let runTests = async ()=>{
    let responseUsers = await createUsers.run();
    let dbUsers = await User.find({});
    createUsers.test([responseUsers[0].data, responseUsers[1].data], dbUsers);

    let responseThoughts = await createThoughts.run([dbUsers[0]._id.toString(), dbUsers[1]._id.toString()]);
    dbUsers = await User.find({});
    let dbThoughts = await Thought.find({});
    createThoughts.test([responseThoughts[0].data, responseThoughts[1].data], dbThoughts, dbUsers);

    await createReactions.run([dbThoughts[0]._id.toString(), dbThoughts[1]._id.toString()]);
    dbThoughts = await Thought.find({});
    createReactions.test(dbThoughts);

    await addFriends.run([dbUsers[0]._id.toString(), dbUsers[1]._id.toString()]);
    dbUsers = await User.find({});
    addFriends.test(dbUsers);

    responseUsers = await updateUser.run(dbUsers[1]._id.toString());
    dbUsers = await User.findOne({_id: dbUsers[1]._id});
    updateUser.test(responseUsers, dbUsers);

    responseThoughts = await updateThought.run(dbThoughts[1]._id.toString());
    dbThoughts = await Thought.findOne({_id: dbThoughts[1]._id});
    updateThought.test(responseThoughts, dbThoughts);

    responseUsers = await getAllUsers.run();
    dbUsers = await User.find({});
    getAllUsers.test(responseUsers.data, dbUsers);

    responseThoughts = await getAllThoughts.run();
    dbThoughts = await Thought.find({});
    getAllThoughts.test(responseThoughts.data, dbThoughts);

    responseUsers = await getSingleUser.run(dbUsers[1]._id.toString());
    dbUsers = await User.findOne({_id: dbUsers[1]._id});
    getSingleUser.test(responseUsers.data, dbUsers);

    responseThoughts = await getSingleThought.run(dbThoughts[1]._id.toString());
    dbThoughts = await Thought.findOne({_id: dbThoughts[1]._id});
    getSingleThought.test(responseThoughts.data, dbThoughts);

    await deleteReactionTest()

    await mongoose.connection.db.dropDatabase((err)=>{console.error(err)});
    mongoose.disconnect();
    console.error("ALL TESTS HAVE RUN");
}

runTests();
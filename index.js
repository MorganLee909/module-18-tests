const mongoose = require("mongoose");

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
const deleteThought = require("./routes/deleteThought.js");
const deleteFriend = require("./routes/deleteFriend.js");
const deleteUser = require("./routes/deleteUser.js");


let runTests = async ()=>{
    await mongoose.connect(`mongodb://127.0.0.1:27017/${process.argv[2]}`);

    await createUsers.run();
    await createThoughts.run();
    await createReactions.run();
    await addFriends.run();
    await updateUser.run();
    await updateThought.run();
    await getAllUsers.run();
    await getAllThoughts.run();
    await getSingleUser.run();

    console.error("ALL TESTS HAVE RUN");
    mongoose.disconnect();
}

runTests();
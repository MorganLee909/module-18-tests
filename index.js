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
const deleteThought = require("./routes/deleteThought.js");
const deleteFriend = require("./routes/deleteFriend.js");
const deleteUser = require("./routes/deleteUser.js");

// let runDeleteReaction = async ()=>{
//     let thoughts = await Thought.find({});

//     let thoughtId = "";
//     let reactionId = "";

//     for(let i = thoughts.length - 1; i >= 0; i--){
//         if(thoughts[i].reactions.length > 0){
//             thoughtId = thoughts[i]._id.toString();
//             reactionId = thoughts[i].reactions[thoughts[i].reactions.length-1].reactionId;
//             break;
//         }
//     }

//     await deleteReaction.run(thoughtId, reactionId);
//     let dbThought = await Thought.findOne({_id: thoughtId});
//     deleteReaction.test(dbThought, reactionId);
// }

// let runDeleteThought = async ()=>{
//     let thought = await Thought.findOne({});

//     await deleteThought.run(thought._id.toString());
//     await deleteThought.test(thought._id.toString());
// }

// let runDeleteFriend = async ()=>{
//     let users = await User.find({});
//     let userId = "";
//     let friendId = "";

//     for(let i = 0; i < users.length; i++){
//         if(users[i].friends.length > 0){
//             userId = users[i]._id.toString();
//             friendId = users[i].friends[0].toString();
//             break;
//         }
//     }

//     await deleteFriend.run(userId, friendId);
//     await deleteFriend.test(userId, friendId);
// }

// let runDeleteUser = async ()=>{
//     let users = await User.find({});
//     let user = {};

//     for(let i = 0; i < users.length; i++){
//         if(users[i].thoughts.length > 0){
//             user = users[i];
//             break;
//         }
//     }

//     await deleteUser.run(user._id.toString());
//     await deleteUser.test(user);
// }

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

    // let responseThoughts = await createThoughts.run([dbUsers[0]._id.toString(), dbUsers[1]._id.toString()]);
    // dbUsers = await User.find({});
    // let dbThoughts = await Thought.find({});
    // createThoughts.test([responseThoughts[0].data, responseThoughts[1].data], dbThoughts, dbUsers);

    // await createReactions.run([dbThoughts[0]._id.toString(), dbThoughts[1]._id.toString()]);
    // dbThoughts = await Thought.find({});
    // createReactions.test(dbThoughts);

    // await addFriends.run([dbUsers[0]._id.toString(), dbUsers[1]._id.toString()]);
    // dbUsers = await User.find({});
    // addFriends.test(dbUsers);

    // responseUsers = await updateUser.run(dbUsers[1]._id.toString());
    // dbUsers = await User.findOne({_id: dbUsers[1]._id});
    // updateUser.test(responseUsers, dbUsers);

    // responseThoughts = await updateThought.run(dbThoughts[1]._id.toString());
    // dbThoughts = await Thought.findOne({_id: dbThoughts[1]._id});
    // updateThought.test(responseThoughts, dbThoughts);

    // responseUsers = await getAllUsers.run();
    // dbUsers = await User.find({});
    // getAllUsers.test(responseUsers.data, dbUsers);

    // responseThoughts = await getAllThoughts.run();
    // dbThoughts = await Thought.find({});
    // getAllThoughts.test(responseThoughts.data, dbThoughts);

    // responseUsers = await getSingleUser.run(dbUsers[1]._id.toString());
    // dbUsers = await User.findOne({_id: dbUsers[1]._id});
    // getSingleUser.test(responseUsers.data, dbUsers);

    // responseThoughts = await getSingleThought.run(dbThoughts[1]._id.toString());
    // dbThoughts = await Thought.findOne({_id: dbThoughts[1]._id});
    // getSingleThought.test(responseThoughts.data, dbThoughts);

    // await runDeleteReaction();
    // await runDeleteThought();
    // await runDeleteFriend();
    // await runDeleteUser();

    console.error("ALL TESTS HAVE RUN");
    mongoose.disconnect();
}

runTests();
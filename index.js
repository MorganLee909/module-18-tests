const mongoose = require("mongoose");

const User = require("./models/user.js");
const Thought = require("./models/thought.js");

const createUsers = require("./routes/createUsers.js");
const createThoughts = require("./routes/createThoughts.js");

mongoose.connect(`mongodb://127.0.0.1:27017/${process.argv[2]}`);

let runTests = async ()=>{
    let responseUsers = await createUsers.run();
    let dbUsers = await User.find({});
    createUsers.test([responseUsers[0].data, responseUsers[1].data], dbUsers);

    let responseThoughts = await createThoughts.run([dbUsers[0]._id.toString(), dbUsers[1]._id.toString()]);
    dbUsers = await User.find({});
    let dbThoughts = await Thought.find({});
    createThoughts.test([responseThoughts[0].data, responseThoughts[1].data], dbThoughts, dbUsers);

    mongoose.disconnect();
}

runTests();
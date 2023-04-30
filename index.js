const mongoose = require("mongoose");

const User = require("./models/user.js");

const createUsers = require("./routes/createUsers.js");

mongoose.connect(`mongodb://127.0.0.1:27017/${process.argv[2]}`);

let runTests = async ()=>{
    let responseUsers = await createUsers.run();
    let dbUsers = await User.find({});
    console.log(dbUsers);
    mongoose.disconnect();
    createUsers.test([responseUsers[0].data, responseUsers[1].data], dbUsers);
}

runTests();
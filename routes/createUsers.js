const axios = require("axios");

module.exports = {
    run: function(){
        let promises = [];

        promises.push(axios({
            url: "http://localhost:8000/api/users",
            method: "post",
            data: {
                username: "Lee Morgan",
                email: "me@leemorgan.io"
            }
        }));

        promises.push(axios({
            url: "http://localhost:8000/api/users",
            method: "post",
            data: {
                username: "Lee",
                email: "lee@leemorgan.io"
            }
        }));

        return Promise.all(promises);
    },

    test: function(response, dbData){
        console.log(response);
        console.log(dbData);
    }
}
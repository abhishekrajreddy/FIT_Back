const username = require("./appConfig").username;
const password = require("./appConfig").password;
const dbName = require("./appConfig").dbname;

module.exports = {
  mongoDBUri: `mongodb+srv://${username}:${password}@cluster0.t7ef0c7.mongodb.net/${dbName}?retryWrites=true&w=majority`,
  privateKey: "mstornsws",
};

const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const newSchema = new Schema({
  first_name: {
    type: String,
    required: true,
  },
  last_name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  //   confirm_password: {
  //     type: String,
  //     required: true,
  //   },
});

module.exports = Users = mongoose.model("users", newSchema);

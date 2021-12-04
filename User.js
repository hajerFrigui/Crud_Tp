const mongoose = require("mongoose");

mongoose.model("User", {
  firstName: {
    type: String,
    require: true,
  },
  lastName: {
    type: String,
    require: true,
  },
  email: {
    type: String,
    require: false,
  }
});
const User = mongoose.model("User");
module.exports = User;

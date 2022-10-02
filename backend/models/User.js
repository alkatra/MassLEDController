const mongoose = require("mongoose");

module.exports = mongoose.model(
  "Users",
  new mongoose.Schema(
    {
      username: String,
      password: String,
      access: String,
    },
    { collection: "users" }
  )
);

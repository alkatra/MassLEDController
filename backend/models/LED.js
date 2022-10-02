const mongoose = require("mongoose");

module.exports = mongoose.model(
  "LEDs",
  new mongoose.Schema(
    {
      ledid: String,
      state: Boolean,
      dim: Boolean,
    },
    { collection: "led-collection" }
  )
);

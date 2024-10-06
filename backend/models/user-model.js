const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const userSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  username: {
    type: String,
    required: false,
  },
  password: {
    type: String,
    required: true,
  },
  shops: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "shop",
    },
  ],
});

module.exports = mongoose.model("user", userSchema);

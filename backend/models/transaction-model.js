const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const transactionSchema = new Schema({
  date: {
    type: Date,
    required: true,
  },
  amount: {
    type: Number,
    required: true,
  },
  paymentType: {
    type: String,
    enum: ["cash", "card", "online"],
    required: true,
  },
  shopName: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("transaction", transactionSchema);

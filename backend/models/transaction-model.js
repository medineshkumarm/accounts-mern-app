const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const transactionSchema = new Schema(
  {
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
    shop: {
      type: mongoose.Schema.Types.ObjectId, // Reference to the shop
      ref: "shop", // Links this transaction to a specific shop
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("transaction", transactionSchema);

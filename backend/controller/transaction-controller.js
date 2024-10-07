const TransactionModel = require("../models/transaction-model");

const ShopModel = require("../models/shop-model");

// Get all transactions for a specific shop
exports.getTransactions = async (req, res) => {
  try {
    const shop = await ShopModel.findById(req.params.shopId).populate(
      "transactions"
    );
    if (!shop) return res.status(404).json({ msg: "Shop not found" });

    res.json(shop.transactions);
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
};

// Add a new transaction for a specific shop
exports.addTransaction = async (req, res) => {
  const { date, amount, paymentType, shopName } = req.body;
  const newTransaction = new TransactionModel({
    date,
    amount,
    paymentType,
    shopName,
    shop: req.params.shopId,
  });

  try {
    const transaction = await newTransaction.save();
    console.log("transaction saved: ", transaction);

    await ShopModel.findByIdAndUpdate(req.params.shopId, {
      $push: { transactions: transaction._id },
    });
    res.status(201).json({
      message: "transaction add successfully",
      transaction,
      success: true,
    });
  } catch (error) {
    res.status(500).json({ error: "Server " });
  }
};

// Get transaction by ID
exports.getTransactionById = async (req, res) => {
  try {
    const transaction = await TransactionModel.findById(req.params.id);
    if (!transaction)
      return res.status(404).json({ msg: "Transaction not found" });
    res.json(transaction);
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
};

// Update transaction
exports.updateTransaction = async (req, res) => {
  try {
    const transaction = await TransactionModel.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!transaction)
      return res.status(404).json({ msg: "Transaction not found" });
    res.json(transaction);
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
};

// Delete transaction
exports.deleteTransaction = async (req, res) => {
  try {
    const transaction = await TransactionModel.findByIdAndDelete(req.params.id);
    if (!transaction)
      return res.status(404).json({ msg: "Transaction not found" });
    res.json({ msg: "Transaction deleted" });
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
};

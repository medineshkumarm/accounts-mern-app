const express = require("express");

const router = express.Router();
const { authMiddleware } = require("../middleware/auth-middleware");

const {
  addTransaction,
  deleteTransaction,
  getTransactions,
  updateTransaction,
  getTransactionById,
} = require("../controller/transaction-controller");

// Transaction management routes (protected)
router.get("/:shopId", authMiddleware, getTransactions); // Get all transactions for a shop
router.post("/:shopId", authMiddleware, addTransaction); // Add a transaction for a shop

router.get("/:id", authMiddleware, getTransactionById); // Get transaction by ID
router.put("/:id", authMiddleware, updateTransaction); // Update transaction by ID
router.delete("/:id", authMiddleware, deleteTransaction); // Delete transaction by ID

module.exports = router;

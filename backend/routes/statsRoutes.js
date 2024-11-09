const express = require("express");

const router = express.Router();
const { authMiddleware } = require("../middleware/auth-middleware");
const {
  transactionSummary,
  transactionSummaryByShopId,
} = require("../controller/stats-controller");

router.get("/stats/:shopId/summary", authMiddleware, transactionSummary);
router.get("/stats/summary", authMiddleware, transactionSummaryByShopId);
module.exports = router;

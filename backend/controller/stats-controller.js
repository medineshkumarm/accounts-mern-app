const Shop = require("../models/shop-model");
const Transaction = require("../models/transaction-model");

function getDateRange(fromDate, toDate) {
  const start = fromDate ? new Date(fromDate) : null;
  const end = toDate ? new Date(toDate) : null;

  // Ensure dates are valid
  if (start && isNaN(start)) throw new Error("Invalid start date format");
  if (end && isNaN(end)) throw new Error("Invalid end date format");

  return { start, end };
}

exports.transactionSummary = async (req, res) => {
  const { fromDate, toDate } = req.query;

  try {
    // Fetch all shops for the user and populate transactions
    const shops = await Shop.find({ user: req.user.id }).populate(
      "transactions"
    );
    if (!shops || shops.length === 0)
      return res.status(404).json({ error: "No shops found for this user" });

    // Parse and validate the date range
    let { start, end } = {};
    try {
      ({ start, end } = getDateRange(fromDate, toDate));
    } catch (dateError) {
      return res.status(400).json({ error: dateError.message });
    }

    // Default date range if not provided
    if (!start && !end) {
      end = new Date();
      start = new Date();
      start.setDate(end.getDate() - 30); // Default to last 30 days
    } else if (!start) {
      start = new Date(end);
      start.setDate(end.getDate() - 30); // Default to last 30 days if only toDate is provided
    } else if (!end) {
      end = new Date(start);
      end.setDate(start.getDate() + 30); // Default to next 30 days if only fromDate is provided
    }

    // Aggregate transactions from all shops and filter by date range
    const transactions = shops.flatMap((shop) =>
      shop.transactions.filter((txn) => {
        const txnDate = new Date(txn.date);
        return txnDate >= start && txnDate <= end;
      })
    );

    if (transactions.length === 0) {
      return res
        .status(404)
        .json({ error: "No transactions found in the specified date range" });
    }

    // Calculate total amount and transaction count
    const totalAmount = transactions.reduce((sum, txn) => sum + txn.amount, 0);
    const transactionCount = transactions.length;

    // Calculate profit based on daily threshold
    const daysCount = Math.ceil((end - start) / (1000 * 60 * 60 * 24));
    const thresholdAmount = shops.reduce(
      (sum, shop) => sum + shop.dailyThreshold * daysCount,
      0
    );
    const profit = totalAmount - thresholdAmount;

    return res.json({
      totalAmount,
      transactionCount,
      profit,
      thresholdAmount,
      daysCount,
      fromDate: fromDate || start.toISOString().split("T")[0],
      toDate: toDate || end.toISOString().split("T")[0],
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Server error" });
  }
};

exports.transactionSummaryByShopId = async (req, res) => {
  const { shopId } = req.params;
  const { fromDate, toDate } = req.query;

  try {
    // Ensure valid shop
    const shop = await Shop.findById(shopId);
    console.log(shop);

    if (!shop) return res.status(404).json({ error: "Shop not found" });

    // Parse and validate date range with improved error handling
    let { start, end } = {};
    try {
      ({ start, end } = getDateRange(fromDate, toDate));
    } catch (dateError) {
      return res.status(400).json({ error: dateError.message });
    }

    // Set default range if dates are not provided
    if (!start || !end) {
      end = new Date();
      start = new Date();
      start.setDate(end.getDate() - 30); // Last 30 days as default
    }

    // Fetch transactions within the date range
    const transactions = await Transaction.find({
      shop: shopId,
      date: { $gte: start, $lte: end },
    });

    // Calculate total amount and transaction count
    const totalAmount = transactions.reduce((sum, txn) => sum + txn.amount, 0);
    const transactionCount = transactions.length;

    // Calculate profit based on daily threshold
    const daysCount = Math.ceil((end - start) / (1000 * 60 * 60 * 24));
    const thresholdAmount = shop.dailyThreshold * daysCount;
    const profit = totalAmount - thresholdAmount;

    return res.json({
      shopId,
      totalAmount,
      transactionCount,
      profit,
      thresholdAmount,
      daysCount,
      fromDate: fromDate || start.toISOString().split("T")[0],
      toDate: toDate || end.toISOString().split("T")[0],
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Server error" });
  }
};

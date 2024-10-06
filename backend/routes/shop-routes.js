const express = require("express");

const router = express.Router();
const { authMiddleware } = require("../middleware/auth-middleware");

const {
  getShops,
  getShopById,
  updateShop,
  deleteShop,
  addShop,
} = require("../controller/shop-controller");

// Shop management routes (protected)
router.get("/", authMiddleware, getShops);
router.post("/", authMiddleware, addShop);
router.get("/:id", authMiddleware, getShopById);
router.put("/:id", authMiddleware, updateShop);
router.delete("/:id", authMiddleware, deleteShop);


module.exports = router;


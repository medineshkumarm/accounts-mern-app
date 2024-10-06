const express = require("express");
const { authMiddleware } = require("../middleware/auth-middleware");

const router = express.Router();

const {
  getUsers,
  getUserById,
  updateUser,
  deleteUser,
} = require("../controller/user-controller");


// User management routes (protected)
router.get("/", authMiddleware, getUsers);
router.get("/:id", authMiddleware, getUserById);
router.put("/:id", authMiddleware, updateUser);
router.delete("/:id", authMiddleware, deleteUser);

module.exports = router;

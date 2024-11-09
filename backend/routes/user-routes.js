const express = require("express");
const { authMiddleware } = require("../middleware/auth-middleware");
const router = express.Router();

const multer = require("multer");
const User = require("../models/user-model");
const path = require("path");
const fs = require('fs');
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
// Ensure 'uploads/' directory exists
const uploadDir = path.join(__dirname, "../uploads");
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir);
}

// Configure multer for file storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix + "-" + file.originalname);
  },
});

const upload = multer({ storage: storage });

// User management routes (protected)
router.get("/", authMiddleware, getUsers);
router.get("/:id", authMiddleware, getUserById);
router.put("/:id", authMiddleware, updateUser);
router.delete("/:id", authMiddleware, deleteUser);

// Route to upload profile picture
router.post(
  "/uploadProfilePicture",
  authMiddleware,
  (req, res, next) => {
    upload.single("profilePicture")(req, res, (err) => {
      if (err instanceof multer.MulterError) {
        return res.status(500).json({ message: "Multer error", error: err });
      } else if (err) {
        return res.status(500).json({ message: "Unknown error", error: err });
      }
      next();
    });
  },
  async (req, res) => {
    const userId = req.user.id;

    try {
      // Check if file is present
      if (!req.file) {
        return res.status(400).json({ message: "No file uploaded" });
      }

      // Update user's profile picture field with the file path
      const updatedUser = await User.findByIdAndUpdate(
        userId,
        { profilePicture: req.file.path },
        { new: true }
      );

      if (!updatedUser) {
        return res.status(404).json({ message: "User not found" });
      }

      res.status(200).json({
        message: "Profile picture uploaded successfully",
        profilePicture: updatedUser.profilePicture,
      });
    } catch (error) {
      res
        .status(500)
        .json({ message: "Error uploading profile picture", error });
    }
  }
);
module.exports = router;

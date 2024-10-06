const UserModel = require("../models/user-model");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const { validationResult } = require("express-validator");

const jwt_secret = process.env.JWT_SECRET;

exports.registerUser = async (req, res) => {
  const { email, password, username } = req.body;
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    let user = await UserModel.findOne({ email });
    if (user) {
      return res.status(400).json({ message: "User already exists" });
    }

    user = new UserModel({
      email,
      password,
      username,
    });

    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(password, salt);

    await user.save();

    const payload = {
      user: {
        id: user._id,
      },
    };

    jwt.sign(payload, jwt_secret, { expiresIn: "1h" }, (err, token) => {
      if (err) throw err;
      res
        .status(201)
        .json({
          message: "User registered successfully",
          token,
          success: true,
        });
    });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ error: "Server error" });
  }
};

exports.loginUser = async (req, res) => {
  const { email, password } = req.body;
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    let user = await UserModel.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "User does not exist" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const payload = {
      user: {
        id: user._id,
      },
    };

    jwt.sign(payload, jwt_secret, { expiresIn: "1h" }, (err, token) => {
      if (err) throw err;
      res
        .status(200)
        .json({ message: "User logged in successfully", token, success: true });
    });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ error: "Server error" });
  }
};

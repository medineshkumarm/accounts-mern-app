const UserModel = require("../models/user-model");

exports.getUsers = async (req, res) => {
  try {
    const user = await UserModel.findById(req.user.id).populate("shops");
    console.log("user found: ", user);
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
};

// Get user by ID
exports.getUserById = async (req, res) => {
  try {
    const user = await UserModel.findById(req.params.id).populate("shops");

    if (!user) return res.status(404).json({ msg: "User not found" });

    res.json(user);
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
};

// Update user
exports.updateUser = async (req, res) => {
  // TODO:
  //if updated data contains password hash it before updating

  try {
    const user = await UserModel.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });

    if (!user) return res.status(404).json({ msg: "User not found" });

    res.json(user);
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
};

// Delete user
exports.deleteUser = async (req, res) => {
  try {
    const user = await UserModel.findByIdAndDelete(req.params.id);

    if (!user) return res.status(404).json({ msg: "User not found" });

    res.json({ msg: "User deleted" });
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
};

const ShopModel = require("../models/shop-model");
const UserModel = require("../models/user-model");

// Get all shops for the authenticated user
exports.getShops = async (req, res) => {
  try {
    const shops = await ShopModel.find({ user: req.user }).populate(
      "transactions"
    );
    res.json(shops);
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
};

// Add a new shop for the authenticated user
exports.addShop = async (req, res) => {
  const { shopName, location, shopNo } = req.body;
  const newShop = new ShopModel({
    shopName,
    location,
    shopNo,
    user: req.user.id, // associate the shop with the authenticated user
  });

  try {
    const shop = await newShop.save();
    const data = await UserModel.findByIdAndUpdate(req.user.id, {
      $push: { shops: shop._id },
    });
    res.status(201).json(shop);
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
};

// Get shop by ID
exports.getShopById = async (req, res) => {
  try {
    const shop = await ShopModel.findById(req.params.id).populate(
      "transactions"
    );

    if (!shop) return res.status(404).json({ msg: "Shop not found" });

    res.json(shop);
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
};

// Update shop
exports.updateShop = async (req, res) => {
  try {
    const shop = await ShopModel.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!shop) return res.status(404).json({ msg: "Shop not found" });
    res.json(shop);
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
};

// Delete shop
exports.deleteShop = async (req, res) => {
  try {
    const shop = await ShopModel.findByIdAndDelete(req.params.id);
    if (!shop) return res.status(404).json({ msg: "Shop not found" });
    res.json({ msg: "Shop deleted" });
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
};

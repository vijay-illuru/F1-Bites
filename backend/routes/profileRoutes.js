const express = require("express");
const User = require("../models/user");
const authMiddleware = require("../middleware/authmiddleware");
const router = express.Router();

// Get user profile
router.get("/", authMiddleware, async (req, res) => {
  try {
    const user = await User.findById(req.userId).select("-password");
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json({
      username: user.username,
      email: user.email,
      phone: user.phone || "",
      city: user.city || "",
      location: user.location || "",
      pincode: user.pincode || "",
      isAdmin: user.isAdmin || false,
    });
  } catch (err) {
    const logger = require("../utils/logger");
    logger.error("Get profile error:", err);
    res.status(500).json({ message: err.message });
  }
});

// Update user profile
router.put("/", authMiddleware, async (req, res) => {
  try {
    const { username, phone, city, location, pincode } = req.body;

    const updates = {};
    if (username) updates.username = username;
    if (phone !== undefined) updates.phone = phone;
    if (city !== undefined) updates.city = city;
    if (location !== undefined) updates.location = location;
    if (pincode !== undefined) updates.pincode = pincode;

    const user = await User.findByIdAndUpdate(
      req.userId,
      updates,
      { new: true, runValidators: true }
    ).select("-password");

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json({
      message: "Profile updated successfully",
      user: {
        username: user.username,
        email: user.email,
        phone: user.phone || "",
        city: user.city || "",
        location: user.location || "",
        pincode: user.pincode || "",
        isAdmin: user.isAdmin || false,
      },
    });
  } catch (err) {
    const logger = require("../utils/logger");
    logger.error("Update profile error:", err);
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;

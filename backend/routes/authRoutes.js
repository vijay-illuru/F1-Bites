const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/user");
const { isValidEmail, validatePassword } = require("../utils/validators");
const router = express.Router();

// ---------- SIGNUP ----------
router.post("/signup", async (req, res) => {
  try {
    const { username, email, password } = req.body;
    if (!username || !email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // Validate email format
    if (!isValidEmail(email)) {
      return res.status(400).json({ message: "Invalid email format" });
    }

    // Validate password strength
    const passwordValidation = validatePassword(password);
    if (!passwordValidation.valid) {
      return res.status(400).json({ message: passwordValidation.message });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser)
      return res.status(400).json({ message: "Email already exists" });

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({ username, email, password: hashedPassword });
    const savedUser = await newUser.save();

    const token = jwt.sign({ id: savedUser._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });

    res.status(201).json({
      message: "User registered successfully",
      token,
      user: {
        id: savedUser._id,
        username: savedUser.username,
        email: savedUser.email,
      },
    });
  } catch (err) {
    const logger = require("../utils/logger");
    logger.error("Signup error:", err);
    res.status(500).json({ message: err.message });
  }
});

// ---------- LOGIN ----------
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password)
      return res.status(400).json({ message: "All fields are required" });

    // Validate email format
    if (!isValidEmail(email)) {
      return res.status(400).json({ message: "Invalid email format" });
    }

    const user = await User.findOne({ email });
    if (!user)
      return res.status(400).json({ message: "User not found" });

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid)
      return res.status(400).json({ message: "Invalid password" });

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });

    res.status(200).json({
      message: "Login successful",
      token,
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
      },
    });
  } catch (err) {
    const logger = require("../utils/logger");
    logger.error("Login error:", err);
    res.status(500).json({ message: err.message });
  }
});

// ---------- ADMIN SIGNUP ----------
router.post("/admin/signup", async (req, res) => {
  try {
    const { username, email, password, adminKey } = req.body;
    
    // Validate all fields
    if (!username || !email || !password || !adminKey) {
      return res.status(400).json({ message: "All fields including admin key are required" });
    }

    // Validate email format
    if (!isValidEmail(email)) {
      return res.status(400).json({ message: "Invalid email format" });
    }

    // Validate password strength
    const passwordValidation = validatePassword(password);
    if (!passwordValidation.valid) {
      return res.status(400).json({ message: passwordValidation.message });
    }

    // Verify admin key
    if (adminKey !== process.env.ADMIN_KEY) {
      return res.status(403).json({ message: "Invalid admin key" });
    }

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "Email already exists" });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create admin user
    const newAdmin = new User({ 
      username, 
      email, 
      password: hashedPassword,
      isAdmin: true 
    });
    const savedAdmin = await newAdmin.save();

    // Generate token
    const token = jwt.sign(
      { id: savedAdmin._id, isAdmin: true }, 
      process.env.JWT_SECRET, 
      { expiresIn: "7d" }
    );

    res.status(201).json({
      message: "Admin registered successfully",
      token,
      user: {
        id: savedAdmin._id,
        username: savedAdmin.username,
        email: savedAdmin.email,
        isAdmin: savedAdmin.isAdmin,
      },
    });
  } catch (err) {
    const logger = require("../utils/logger");
    logger.error("Admin signup error:", err);
    res.status(500).json({ message: err.message });
  }
});

// ---------- ADMIN LOGIN ----------
router.post("/admin/login", async (req, res) => {
  try {
    const { email, password, adminKey } = req.body;
    
    // Validate all fields
    if (!email || !password || !adminKey) {
      return res.status(400).json({ message: "All fields including admin key are required" });
    }

    // Validate email format
    if (!isValidEmail(email)) {
      return res.status(400).json({ message: "Invalid email format" });
    }

    // Verify admin key
    if (adminKey !== process.env.ADMIN_KEY) {
      return res.status(403).json({ message: "Invalid admin key" });
    }

    // Find user
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }

    // Check if user is admin
    if (!user.isAdmin) {
      return res.status(403).json({ message: "Access denied. Not an admin account." });
    }

    // Verify password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(400).json({ message: "Invalid password" });
    }

    // Generate token
    const token = jwt.sign(
      { id: user._id, isAdmin: true }, 
      process.env.JWT_SECRET, 
      { expiresIn: "7d" }
    );

    res.status(200).json({
      message: "Admin login successful",
      token,
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
        isAdmin: user.isAdmin,
      },
    });
  } catch (err) {
    const logger = require("../utils/logger");
    logger.error("Admin login error:", err);
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;

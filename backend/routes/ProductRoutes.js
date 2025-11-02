const express = require("express");
const Product = require("../models/Product");
const adminAuth = require("../middleware/adminMiddleware");
const router = express.Router();

// Get all products with search and filtering
router.get("/", async (req, res) => {
  try {
    const { q, category, available } = req.query;
    let query = {};

    // Search functionality
    if (q) {
      query.$or = [
        { name: { $regex: q, $options: "i" } },
        { description: { $regex: q, $options: "i" } },
        { category: { $regex: q, $options: "i" } }
      ];
    }

    // Category filter
    if (category) {
      query.category = { $regex: category, $options: "i" };
    }

    // Availability filter
    if (available !== undefined) {
      query.isAvailable = available === "true";
    }

    const products = await Product.find(query).sort({ createdAt: -1 });
    res.json(products);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get single product
router.get("/:id", async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ error: "Product not found" });
    }
    res.json(product);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Add a single product (admin only)
router.post("/", adminAuth, async (req, res) => {
  try {
    const { name, price, category, image, description, stock } = req.body;

    // Validation
    if (!name || !price || !category) {
      return res.status(400).json({ error: "Name, price, and category are required" });
    }

    if (price < 0) {
      return res.status(400).json({ error: "Price cannot be negative" });
    }

    if (stock < 0) {
      return res.status(400).json({ error: "Stock cannot be negative" });
    }

    const product = new Product({
      name,
      price,
      category,
      image,
      description,
      stock: stock || 0,
      isAvailable: (stock || 0) > 0
    });

    await product.save();
    res.status(201).json(product);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Update product (admin only)
router.patch("/:id", adminAuth, async (req, res) => {
  try {
    const updates = req.body;
    
    // Validate price and stock if provided
    if (updates.price !== undefined && updates.price < 0) {
      return res.status(400).json({ error: "Price cannot be negative" });
    }

    if (updates.stock !== undefined && updates.stock < 0) {
      return res.status(400).json({ error: "Stock cannot be negative" });
    }

    // Auto-update availability based on stock
    if (updates.stock !== undefined) {
      updates.isAvailable = updates.stock > 0;
    }

    const product = await Product.findByIdAndUpdate(
      req.params.id,
      updates,
      { new: true, runValidators: true }
    );

    if (!product) {
      return res.status(404).json({ error: "Product not found" });
    }

    res.json(product);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Delete product (admin only)
router.delete("/:id", adminAuth, async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);
    if (!product) {
      return res.status(404).json({ error: "Product not found" });
    }
    res.json({ message: "Product deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;

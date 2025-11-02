const express = require("express");
const Product = require("../models/Product");
const adminAuth = require("../middleware/adminMiddleware");
const upload = require("../middleware/upload");
const router = express.Router();

// Get all products for admin
router.get("/products", adminAuth, async (req, res) => {
  try {
    const products = await Product.find().sort({ createdAt: -1 });
    res.json(products);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Add new product with image upload
router.post("/products", adminAuth, upload.single('image'), async (req, res) => {
  try {
    const { name, price, category, description, stock } = req.body;

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

    // Create image URL if file was uploaded
    let imageUrl = null;
    if (req.file) {
      imageUrl = `${req.protocol}://${req.get('host')}/uploads/products/${req.file.filename}`;
    }

    const product = new Product({
      name,
      price: Number(price),
      category,
      image: imageUrl,
      description,
      stock: Number(stock) || 0,
      isAvailable: (Number(stock) || 0) > 0
    });

    await product.save();
    res.status(201).json(product);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Update product with optional image upload
router.patch("/products/:id", adminAuth, upload.single('image'), async (req, res) => {
  try {
    const updates = req.body;
    
    // Validate price and stock if provided
    if (updates.price !== undefined && updates.price < 0) {
      return res.status(400).json({ error: "Price cannot be negative" });
    }

    if (updates.stock !== undefined && updates.stock < 0) {
      return res.status(400).json({ error: "Stock cannot be negative" });
    }

    // Convert string numbers to actual numbers
    if (updates.price) updates.price = Number(updates.price);
    if (updates.stock !== undefined) {
      updates.stock = Number(updates.stock);
      updates.isAvailable = updates.stock > 0;
    }

    // Update image URL if new file was uploaded
    if (req.file) {
      updates.image = `${req.protocol}://${req.get('host')}/uploads/products/${req.file.filename}`;
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

// Delete product
router.delete("/products/:id", adminAuth, async (req, res) => {
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

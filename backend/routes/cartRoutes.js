const express = require("express");
const Cart = require("../models/Cart");
const Product = require("../models/Product");
const auth = require("../middleware/authmiddleware");
const router = express.Router();

// Get user's cart
router.get("/", auth, async (req, res) => {
  try {
    const cart = await Cart.findOne({ userId: req.userId })
      .populate("items.productId", "name price image description category stock isAvailable");
    
    if (!cart) {
      return res.json({ items: [] });
    }

    // Filter out unavailable products and add quantity
    const availableItems = cart.items
      .filter(item => item.productId && item.productId.isAvailable)
      .map(item => ({
        _id: item.productId._id,
        name: item.productId.name,
        price: item.productId.price,
        image: item.productId.image,
        description: item.productId.description,
        category: item.productId.category,
        stock: item.productId.stock,
        quantity: item.quantity
      }));

    res.json({ items: availableItems });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Add item to cart
router.post("/add", auth, async (req, res) => {
  try {
    const { productId, quantity = 1 } = req.body;

    if (!productId) {
      return res.status(400).json({ error: "Product ID is required" });
    }

    // Check if product exists and is available
    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ error: "Product not found" });
    }

    if (!product.isAvailable) {
      return res.status(400).json({ error: "Product is not available" });
    }

    if (product.stock < quantity) {
      return res.status(400).json({ error: `Only ${product.stock} items available` });
    }

    // Find or create cart
    let cart = await Cart.findOne({ userId: req.userId });
    if (!cart) {
      cart = new Cart({ userId: req.userId, items: [] });
    }

    // Check if item already exists in cart
    const existingItemIndex = cart.items.findIndex(
      item => item.productId.toString() === productId
    );

    if (existingItemIndex > -1) {
      // Update quantity
      const newQuantity = cart.items[existingItemIndex].quantity + quantity;
      if (newQuantity > product.stock) {
        return res.status(400).json({ error: `Cannot add more. Only ${product.stock} items available` });
      }
      cart.items[existingItemIndex].quantity = newQuantity;
    } else {
      // Add new item
      cart.items.push({ productId, quantity });
    }

    await cart.save();
    res.json({ message: "Item added to cart successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Update item quantity in cart
router.patch("/update", auth, async (req, res) => {
  try {
    const { productId, quantity } = req.body;

    if (!productId || quantity < 1) {
      return res.status(400).json({ error: "Valid product ID and quantity are required" });
    }

    // Check product stock
    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ error: "Product not found" });
    }

    if (quantity > product.stock) {
      return res.status(400).json({ error: `Only ${product.stock} items available` });
    }

    const cart = await Cart.findOne({ userId: req.userId });
    if (!cart) {
      return res.status(404).json({ error: "Cart not found" });
    }

    const itemIndex = cart.items.findIndex(
      item => item.productId.toString() === productId
    );

    if (itemIndex === -1) {
      return res.status(404).json({ error: "Item not found in cart" });
    }

    cart.items[itemIndex].quantity = quantity;
    await cart.save();

    res.json({ message: "Cart updated successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Remove item from cart
router.delete("/remove/:productId", auth, async (req, res) => {
  try {
    const { productId } = req.params;

    const cart = await Cart.findOne({ userId: req.userId });
    if (!cart) {
      return res.status(404).json({ error: "Cart not found" });
    }

    cart.items = cart.items.filter(
      item => item.productId.toString() !== productId
    );

    await cart.save();
    res.json({ message: "Item removed from cart" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Clear cart
router.delete("/clear", auth, async (req, res) => {
  try {
    await Cart.findOneAndUpdate(
      { userId: req.userId },
      { items: [] },
      { upsert: true }
    );
    res.json({ message: "Cart cleared successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;

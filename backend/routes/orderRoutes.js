const express = require("express");
const mongoose = require("mongoose");
const Order = require("../models/Order");
const Product = require("../models/Product");
const auth = require("../middleware/authmiddleware");
const adminAuth = require("../middleware/adminMiddleware");
const router = express.Router();

// Get user's orders
router.get("/", auth, async (req, res) => {
  try {
    const orders = await Order.find({ userId: req.userId })
      .populate("items.productId", "name image")
      .sort({ createdAt: -1 });
    res.json(orders);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Create new order
router.post("/", auth, async (req, res) => {
  try {
    const { items, customer, paymentMethod } = req.body;

    // Validate required fields
    if (!items || !Array.isArray(items) || items.length === 0) {
      return res.status(400).json({ error: "Items are required" });
    }

    if (!customer || !customer.name || !customer.email || !customer.address || !customer.city || !customer.pincode) {
      return res.status(400).json({ error: "All customer details are required" });
    }

    // Validate stock and calculate total
    let totalAmount = 0;
    const validatedItems = [];

    for (const item of items) {
      const product = await Product.findById(item.productId || item._id);
      if (!product) {
        return res.status(400).json({ error: `Product ${item.name} not found` });
      }

      if (!product.isAvailable) {
        return res.status(400).json({ error: `Product ${product.name} is not available` });
      }

      if (product.stock < item.quantity) {
        return res.status(400).json({ error: `Insufficient stock for ${product.name}. Available: ${product.stock}` });
      }

      validatedItems.push({
        productId: product._id,
        name: product.name,
        price: product.price,
        quantity: item.quantity,
        image: product.image
      });

      totalAmount += product.price * item.quantity;
    }

    // Use transaction to ensure atomicity
    const session = await mongoose.startSession();
    session.startTransaction();

    try {
      // Create order
      const order = new Order({
        userId: req.userId,
        items: validatedItems,
        totalAmount,
        customer,
        paymentMethod: paymentMethod || "Cash on Delivery",
        status: "delivered", // Set all orders as delivered for now (will change after adding payment)
        estimatedDeliveryTime: new Date(Date.now() + 45 * 60 * 1000) // 45 minutes from now
      });

      await order.save({ session });

      // Update product stock atomically
      for (const item of validatedItems) {
        const product = await Product.findById(item.productId).session(session);
        
        // Double-check stock availability (race condition protection)
        if (product.stock < item.quantity) {
          throw new Error(`Insufficient stock for ${product.name}. Available: ${product.stock}`);
        }

        const newStock = product.stock - item.quantity;
        await Product.findByIdAndUpdate(
          item.productId,
          { 
            $inc: { stock: -item.quantity },
            $set: { isAvailable: newStock > 0 }
          },
          { session }
        );
      }

      // Commit transaction
      await session.commitTransaction();
      session.endSession();

      res.status(201).json({
        message: "Order placed successfully",
        order: {
          id: order._id,
          totalAmount: order.totalAmount,
          status: order.status,
          estimatedDeliveryTime: order.estimatedDeliveryTime
        }
      });
    } catch (err) {
      // Rollback transaction on error
      await session.abortTransaction();
      session.endSession();
      throw err;
    }

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get specific order
router.get("/:id", auth, async (req, res) => {
  try {
    const order = await Order.findOne({ _id: req.params.id, userId: req.userId })
      .populate("items.productId", "name image");
    
    if (!order) {
      return res.status(404).json({ error: "Order not found" });
    }

    res.json(order);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Update order status (admin only)
router.patch("/:id/status", adminAuth, async (req, res) => {
  try {
    const { status } = req.body;
    const validStatuses = ["pending", "confirmed", "preparing", "out_for_delivery", "delivered", "cancelled"];
    
    if (!validStatuses.includes(status)) {
      return res.status(400).json({ error: "Invalid status" });
    }

    const order = await Order.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );

    if (!order) {
      return res.status(404).json({ error: "Order not found" });
    }

    res.json({ message: "Order status updated", order });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;

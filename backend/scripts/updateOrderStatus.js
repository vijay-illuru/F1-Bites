const mongoose = require("mongoose");
const Order = require("../models/Order");
require("dotenv").config();

async function updateAllOrdersToDelivered() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("Connected to MongoDB");

    // Update all pending orders to delivered
    const result = await Order.updateMany(
      { status: "pending" },
      { status: "delivered" }
    );

    console.log(`✅ Updated ${result.modifiedCount} orders from pending to delivered`);

    // Show all orders with their status
    const orders = await Order.find({}, 'customer.name totalAmount status createdAt');
    console.log("\nAll orders:");
    orders.forEach(o => {
      console.log(`- Order #${o._id}: ₹${o.totalAmount} - ${o.status.toUpperCase()} (${o.createdAt.toLocaleString()})`);
    });

    process.exit(0);
  } catch (error) {
    console.error("Error updating orders:", error);
    process.exit(1);
  }
}

updateAllOrdersToDelivered();

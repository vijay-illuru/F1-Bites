const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },
  items: [{
    productId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
      required: true
    },
    name: { type: String, required: true },
    price: { type: Number, required: true },
    quantity: { type: Number, required: true, min: 1 },
    image: { type: String }
  }],
  totalAmount: {
    type: Number,
    required: true,
    min: 0
  },
  customer: {
    name: { type: String, required: true },
    email: { type: String, required: true },
    address: { type: String, required: true },
    city: { type: String, required: true },
    pincode: { type: String, required: true },
    phone: { type: String }
  },
  paymentMethod: {
    type: String,
    enum: ["Credit Card", "Debit Card", "UPI", "Net Banking", "Cash on Delivery"],
    default: "Cash on Delivery"
  },
  status: {
    type: String,
    enum: ["pending", "confirmed", "preparing", "out_for_delivery", "delivered", "cancelled"],
    default: "pending"
  },
  deliveryFee: {
    type: Number,
    default: 0
  },
  estimatedDeliveryTime: {
    type: Date
  }
}, {
  timestamps: true
});

// Add indexes for better query performance
orderSchema.index({ userId: 1, createdAt: -1 });
orderSchema.index({ status: 1 });
orderSchema.index({ createdAt: -1 });

module.exports = mongoose.model("Order", orderSchema);

const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true, min: 0 },
  category: { type: String, required: true },
  image: { type: String },
  description: { type: String },
  stock: { type: Number, required: true, min: 0, default: 0 },
  isAvailable: { type: Boolean, default: true }
}, {
  timestamps: true
});

// Add indexes for better query performance
productSchema.index({ category: 1 });
productSchema.index({ isAvailable: 1 });
productSchema.index({ createdAt: -1 });
productSchema.index({ name: 'text', description: 'text', category: 'text' });

module.exports = mongoose.model("Product", productSchema);

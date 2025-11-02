const mongoose = require("mongoose");
const Product = require("../models/Product");
require("dotenv").config();

async function updateProductStock() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("Connected to MongoDB");

    // Update products that don't have stock field or have stock = 0
    const result = await Product.updateMany(
      { $or: [{ stock: { $exists: false } }, { stock: 0 }] },
      { 
        $set: { 
          stock: 50, 
          isAvailable: true 
        } 
      }
    );

    console.log(`Updated ${result.modifiedCount} products with stock`);

    // Show all products with their stock
    const products = await Product.find({}, 'name stock isAvailable');
    console.log("\nCurrent products:");
    products.forEach(p => {
      console.log(`- ${p.name}: Stock ${p.stock}, Available: ${p.isAvailable}`);
    });

    process.exit(0);
  } catch (error) {
    console.error("Error updating stock:", error);
    process.exit(1);
  }
}

updateProductStock();

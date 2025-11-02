const mongoose = require("mongoose");
require("dotenv").config();
const User = require("../models/user");

async function checkUsers() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("✓ Connected to MongoDB");

    const users = await User.find({});
    console.log(`\nTotal users in database: ${users.length}`);
    
    if (users.length > 0) {
      console.log("\nUsers list:");
      users.forEach((user, index) => {
        console.log(`${index + 1}. Email: ${user.email}, Username: ${user.username}, IsAdmin: ${user.isAdmin}`);
      });
    } else {
      console.log("\n⚠️  No users found in database!");
      console.log("You need to:");
      console.log("1. Sign up a new user via the frontend/API");
      console.log("2. Or run: npm run make-admin to create an admin user");
    }

    await mongoose.disconnect();
  } catch (err) {
    console.error("Error:", err.message);
  }
}

checkUsers();

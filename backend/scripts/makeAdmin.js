const mongoose = require("mongoose");
const User = require("../models/user");
require("dotenv").config();

async function makeUserAdmin() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("Connected to MongoDB");

    // Get email from command line argument
    const email = process.argv[2];
    
    if (!email) {
      console.log("Usage: node scripts/makeAdmin.js <email>");
      console.log("Example: node scripts/makeAdmin.js admin@example.com");
      process.exit(1);
    }

    // Find user by email and make them admin
    const user = await User.findOneAndUpdate(
      { email: email },
      { isAdmin: true },
      { new: true }
    );

    if (!user) {
      console.log(`User with email ${email} not found.`);
      console.log("Please make sure the user has signed up first.");
    } else {
      console.log(`✅ User ${user.username} (${user.email}) is now an admin!`);
    }

    process.exit(0);
  } catch (error) {
    console.error("Error making user admin:", error);
    process.exit(1);
  }
}

makeUserAdmin();

const mongoose = require("mongoose");
require("dotenv").config();

async function testConnection() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("✅ Connected to MongoDB");
    console.log("📦 Database name:", mongoose.connection.db.databaseName);
    console.log("📊 Collections:", await mongoose.connection.db.listCollections().toArray());
    
    // List all databases
    const admin = mongoose.connection.db.admin();
    const { databases } = await admin.listDatabases();
    console.log("\n🗄️  All databases in cluster:");
    databases.forEach(db => {
      console.log(`   - ${db.name} (${(db.sizeOnDisk / 1024 / 1024).toFixed(2)} MB)`);
    });
    
    process.exit(0);
  } catch (error) {
    console.error("❌ Error:", error.message);
    process.exit(1);
  }
}

testConnection();

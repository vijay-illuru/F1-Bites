const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const validateEnv = require("./utils/envValidation");

// Validate environment variables before starting server
validateEnv();

const productRoutes = require("./routes/ProductRoutes");
const authRoutes = require("./routes/authRoutes");
const orderRoutes = require("./routes/orderRoutes");
const cartRoutes = require("./routes/cartRoutes");
const adminRoutes = require("./routes/adminRoutes");
const profileRoutes = require("./routes/profileRoutes");

const app = express();

app.use(cors({
  origin: function (origin, callback) {
    const allowedOrigins = [
      process.env.FRONTEND_URL,
      'http://localhost:5173',
      'http://localhost:3000'
    ].filter(Boolean);
    
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(null, true);
    }
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Serve static files (uploaded images)
app.use('/uploads', express.static('uploads'));

const logger = require("./utils/logger");

mongoose.connect(process.env.MONGO_URI)
  .then(() => logger.info(`Connected to MongoDB database: ${mongoose.connection.db.databaseName}`))
  .catch(err => logger.error("MongoDB connection error:", err));

app.use("/api/products", productRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/cart", cartRoutes); 
app.use("/api/admin", adminRoutes);
app.use("/api/profile", profileRoutes);

// Error handling middleware (must be last)
const errorHandler = require("./middleware/errorHandler");
const notFound = require("./middleware/notFound");

app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => logger.info(`Server running on http://localhost:${PORT}`));

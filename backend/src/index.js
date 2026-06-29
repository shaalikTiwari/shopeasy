require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const helmet = require("helmet");
const rateLimit = require("express-rate-limit");

const userRoutes = require("./routes/userRoutes");
const productRoutes = require("./routes/productRoutes");
const orderRoutes = require("./routes/orderRoutes");
const paymentRoutes = require("./routes/paymentRoutes");

const app = express();

app.use(helmet());
app.use(cors({ origin: process.env.CLIENT_URL || "http://localhost:5173", credentials: true }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const limiter = rateLimit({ windowMs: 15 * 60 * 1000, max: 100 });
app.use("/api", limiter);

app.use("/api/users", userRoutes);
app.use("/api/products", productRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/payment", paymentRoutes);

app.get("/", (req, res) => res.json({ message: "ShopEasy API running 🚀" }));

mongoose
  .connect("mongodb://localhost:27017/shopeasy")
  .then(() => {
    console.log("✅ MongoDB connected");
    app.listen(process.env.PORT || 5008, () =>
      console.log(`✅ Server running on port ${process.env.PORT || 5008}`)
    );
  })
  .catch((err) => console.error("❌ MongoDB connection error:", err));
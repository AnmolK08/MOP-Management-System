import express from "express";
import { config } from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import errorHandler from "./utils/ErrorHandler.js";
import authRoutes from "./routes/auth.route.js";
import providerRoutes from "./routes/provider.route.js";
import orderRoutes from "./routes/order.route.js"
import paymentRoutes from "./routes/payment.route.js"
import fetchRoute from "./routes/fetch.route.js"
import profileRoutes from "./routes/profile.route.js"
import notificationRoutes from "./routes/notification.route.js"
import { healthRateLimiter } from "./middleware/rateLimiting.js";
import { app, server } from "./config/socket.js"
import { connectDB } from "./config/db.js";
config();

app.use(express.json());
app.use(cookieParser());
const CLIENT_URL = process.env.FRONTEND_URL;

app.use(
  cors({
    origin: ['http://localhost:5173', CLIENT_URL],
    credentials: true,
  })
);

app.use("/auth", authRoutes)
app.use("/provider", providerRoutes);
app.use("/order", orderRoutes)
app.use("/payment", paymentRoutes)
app.use("/fetch", fetchRoute)
app.use("/profile" , profileRoutes);
app.use("/notifications", notificationRoutes);

app.get("/health", healthRateLimiter, (req, res) => {
  res.status(200).json({
    status: "OK",
    message: "Server is running",
    timestamp: new Date().toISOString(),
    uptime: process.uptime()
  });
});

app.use(errorHandler);

const PORT = process.env.PORT || 8080;

const startServer = async () => {
  try {
    await connectDB();
    server.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  } catch (error) {
    console.error("Failed to start server due to database connection error.");
    process.exit(1);
  }
};

startServer();
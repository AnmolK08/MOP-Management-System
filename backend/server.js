import express from "express";
import { config } from "dotenv";
import cors from "cors";
import errorHandler from "./utils/ErrorHandler.js";
import authRoutes from "./routes/auth.route.js";
import providerRoutes from "./routes/provider.route.js";
import orderRoutes from "./routes/order.route.js"
import paymentRoutes from "./routes/payment.route.js"
import fetchRoute from "./routes/fetch.route.js"
import profileRoutes from "./routes/profile.route.js"
import notificationRoutes from "./routes/notification.route.js"
import { app, server } from "./config/socket.js"
import { connectDB } from "./config/db.js";
config();

app.use(express.json());
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
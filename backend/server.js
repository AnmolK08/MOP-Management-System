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

config();

app.use(express.json());

app.use(
  cors({
    origin: 'http://localhost:5173',
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
server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
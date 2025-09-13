import express from "express";
import { config } from "dotenv";
import cors from "cors";
import errorHandler from "./utils/ErrorHandler.js";
import authRoutes from "./routes/auth.route.js";
import providerRoutes from "./routes/provider.route.js";
import orderRoutes from "./routes/order.route.js"
import paymentRoutes from "./routes/payment.route.js"

config();

const app = express();

app.use(express.json());

app.use(
  cors({
    origin: "*",
    credentials: true,
  })
);

app.use("/auth", authRoutes)
app.use("/provider", providerRoutes);
app.use("/order", orderRoutes)
app.use("/payment", paymentRoutes)

app.use(errorHandler);

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
import express from "express";
import {
  placeOrder,
  cancelOrder,
  getAllOrders,
  getOrderByUser,
  deleteOrder,
  orderDelivered,
  seenOrder,
  getOdersForTheMenu,
} from "../controller/order.controller.js";
import isAuthenticated from "../middleware/isAuthenticated.js";
import isProvider from "../middleware/isProvider.js";

const router = express.Router();

router.post("/placeOrder", isAuthenticated, placeOrder);

router.put("/cancelOrder/:id", isAuthenticated, cancelOrder);

router.get("/getAllOrders", isAuthenticated, isProvider, getAllOrders);

router.get(
  "/getOrderByUser/:userId",
  isAuthenticated,
  isProvider,
  getOrderByUser
);

router.delete("/deleteOrder/:id", isAuthenticated, isProvider, deleteOrder);

router.put("/orderDelivered/:id", isAuthenticated, isProvider, orderDelivered);

router.put("/seenOrder/:id", isAuthenticated, isProvider, seenOrder);

router.get("/ordersForMenu", isAuthenticated, isProvider, getOdersForTheMenu);

export default router;

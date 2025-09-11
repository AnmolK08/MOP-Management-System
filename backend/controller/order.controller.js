import asyncHandler from "express-async-handler";
import ResponseError from "../types/ResponseError.js";
import prisma from "../config/db.js";

export const placeOrder = asyncHandler(async (req, res) => {
  const { items, type } = req.body;

  if (!items || items.length === 0 || !type) {
    throw new ResponseError("Please provide all required fields");
  }

  const menu = await prisma.menu.findFirst({
    where: {
      type: type,
      date: {
        gte: new Date(new Date().setHours(0, 0, 0, 0)),
      },
    },
  });

  if (!menu) throw new ResponseError("Menu is not provided yet.", 404);

  const user = await prisma.customer.findUnique({
    where: { userId: req.userId },
  });

  if (!user) {
    throw new ResponseError("Customer profile not found", 404);
  }

  const existingOrder = await prisma.order.findFirst({
    where: {
      customerId: user.id,
      type,
      date: { gte: new Date(new Date().setHours(0, 0, 0, 0)) },
    },
  });
  if (existingOrder) {
    throw new ResponseError("You have already placed an order for today", 400);
  }

  const order = await prisma.order.create({
    data: {
      customerId: user.id,
      items,
      type,
      status: "PLACED",
      date: new Date(),
    },
  });

  res
    .status(201)
    .json({ success: true, message: "Order placed successfully", data: order });
}); //done

export const cancelOrder = asyncHandler(async (req, res) => {
  const { id } = req.params;

  if (!id) {
    throw new ResponseError("Please provide all required fields");
  }
  const order = await prisma.order.findUnique({ where: {id} });

  if (!order) {
    throw new ResponseError("Order not found", 404);
  }

  const customer = await prisma.customer.findUnique({where: {userId: req.userId}})

  if(customer.id!==order.customerId)
    throw new ResponseError("You cannot cancel someone else's order", 403)

  if (
    order.status === "PLACED" ||
    (req.role === "PROVIDER" && order.status !== "DELIVERED")
  ) {
    const updatedOrder = await prisma.order.update({
      where: { id },
      data: { status: "CANCELLED" },
    });
    return res.status(200).json({
      success: true,
      message: "Order cancelled successfully",
      data: updatedOrder,
    });
  }
  throw new ResponseError("Order cannot be cancelled", 400);
}); //done

export const getAllOrders = asyncHandler(async (_, res) => {
  const orders = await prisma.order.findMany();
  res.status(200).json({ success: true, data: orders });
}); //done

export const getOrderByUser = asyncHandler(async (req, res) => {
  const { userId } = req.params;
  if (!userId) {
    throw new ResponseError("Please provide user id");
  }
  const orders = await prisma.order.findMany({ where: { customerId: userId } });
  res.status(200).json({ success: true, data: orders });
}); //done

export const deleteOrder = asyncHandler(async (req, res) => {
  const { id } = req.params;

  if (!id) {
    throw new ResponseError("Please provide order id");
  }

  const order = await prisma.order.findUnique({ where: { id } });

  if (!order) {
    throw new ResponseError("Order not found", 404);
  }

  if (
    (order.status === "DELIVERED" && order.paid) ||
    order.status === "CANCELLED"
  ) {
    await prisma.order.delete({ where: { id } });
  }

  res.status(200).json({
    success: true,
    message: "Order deleted successfully",
    data: order,
  });
}); //done

export const orderDelivered = asyncHandler(async (req, res) => {
  const { id } = req.params;

  if (!id) {
    throw new ResponseError("Please provide order id");
  }
  const order = await prisma.order.findUnique({ where: {id} });

  if (!order) {
    throw new ResponseError("Order not found", 404);
  }

  const user = await prisma.customer.findUnique({
    where: { id: order.customerId },
  });

  if (!user) {
    throw new ResponseError("User not found", 404);
  }

  let totalAmt = 0;

  if (user.premium) totalAmt = 54.0;
  else totalAmt = 60.0;

  let isPaid = order.paid;

  if (user.wallet >= totalAmt) isPaid = true;

  const updatedOrder = await prisma.order.update({
    where: { id },
    data: {
      status: "DELIVERED",
      paid: isPaid,
      totalAmt,
    },
  });

  user.wallet -= totalAmt;

  await prisma.customer.update({
    where: { id: user.id },
    data: { wallet: user.wallet },
  });

  res.status(200).json({
    success: true,
    message: "Order marked as delivered",
    data: updatedOrder,
  });
}); //done

export const seenOrder = asyncHandler(async (req, res) => {
  const { id } = req.params;

  if (!id) {
    throw new ResponseError("Please provide order id");
  }

  const order = await prisma.order.update({
    where: { id },
    data: { status: "SEEN" },
  });

  res
    .status(200)
    .json({ success: true, message: "Order marked as seen", data: order });
}); //done

export const getOdersForTheMenu = asyncHandler(async (req, res) => {
  const { date, type } = req.query;
  if (!date || !type) {
    throw new ResponseError("Please provide all required fields");
  }
  const orders = await prisma.order.findMany({
    where: { date: new Date(date), type },
  });
  res.status(200).json({ success: true, data: orders });
}); //done

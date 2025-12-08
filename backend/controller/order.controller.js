import asyncHandler from "express-async-handler";
import ResponseError from "../types/ResponseError.js";
import prisma from "../config/db.js";
import {getRecieverSocketId, io} from "../config/socket.js";
import { createNotification } from "./notifications.controller.js";

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
    },include: {
      customer: {
        include: {
          user: {  
            select: {
              name: true,
            },
          },
        },
      },
    }
  });

  if(!order){
    throw new ResponseError("Failed to place order", 500);
  }

  const providerId = await prisma.user.findMany({
    where: { role: "PROVIDER" },
    select: { id: true }
  })

  Promise.all(providerId.map(async ({id}) =>{
    const socketId = await getRecieverSocketId(id);
    const notification = await createNotification({
      senderId: req.userId,
      receiverId: id,
      message: `New ${type} order placed by ${order.customer.user.name}`,
    })

    if(socketId && notification){
      io.to(socketId).emit("newOrder", {order, notification});
    }
  }))

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
      include: {
        customer: {
          include: {
            user: {
              select: {
                name: true,
              },
            },
          },
        },
      },
    });

    // Notify providers about cancellation
    const providers = await prisma.user.findMany({
      where: { role: "PROVIDER" },
      select: { id: true }
    });

    Promise.all(providers.map(async ({ id }) => {
      const socketId = await getRecieverSocketId(id);
      const notification = await createNotification({
        senderId: req.userId,
        receiverId: id,
        message: `${updatedOrder.customer.user.name} cancelled the ${updatedOrder.type} order.`,
      });

      if (socketId && notification) {
        io.to(socketId).emit("cancelOrder", {updatedOrder, notification});
      }
    }));

    return res.status(200).json({
      success: true,
      message: "Order cancelled successfully",
      data: updatedOrder,
    });
  }
  throw new ResponseError("Order cannot be cancelled", 400);
}); //done1

export const getAllOrders = asyncHandler(async (_, res) => {
  const orders = await prisma.order.findMany({
    orderBy: {
      createdAt: "desc",
    },
    include: {
      customer: {
        include: {
          user: {  
            select: {
              name: true,
            },
          },
        },
      },
    },
  });

  res.status(200).json({ success: true, data: orders });
});

export const getOrderByUser = asyncHandler(async (req, res) => {
  const { userId } = req.params;
  if (!userId) {
    throw new ResponseError("Please provide user id");
  }
  const orders = await prisma.order.findMany({ 
    where: { customerId: userId },
    orderBy: { date: "desc" }
  });
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

  const updatedOrder = await deliveredAndPaid(id);

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

  const today = new Date(date)
  const orders = await prisma.order.findMany({
    where: { date: {
      gte: new Date(today.setHours(0,0,0,0))
    }, type },
  });
  res.status(200).json({ success: true, data: orders });
}); //done

export const updateOrder = asyncHandler(async (req, res)=>{
  const {orderId} = req.params;
  const {items} = req.body;

  if(!orderId)
      throw new ResponseError("Please provide Order id.")
  
  const order = await prisma.order.findUnique(
    {
      where:{
        id: orderId
      }
    }
  )

  if(!order)
    throw new ResponseError("Order not found.",404)

  if(order.status!=="PLACED" )
    throw new ResponseError("Can't be updated", 403)

  const updatedOrder = await prisma.order.update({
    where:{
      id: orderId
    },
    data:{
      items
    },
    include: {
      customer: {
        include: {
          user: {
            select: {
              name: true,
              id: true,
            },
          },
        },
      },
    },
  })

  // Notify providers about order update
  const providers = await prisma.user.findMany({
    where: { role: "PROVIDER" },
    select: { id: true }
  });

  Promise.all(providers.map(async ({ id }) => {
    const socketId = await getRecieverSocketId(id);
    const notification = await createNotification({
      senderId: req.userId,
      receiverId: id,
      message: `${updatedOrder.customer.user.name} updated their ${updatedOrder.type} order.`,
    });

    if (socketId && notification) {
      io.to(socketId).emit("updateOrderNotification", {notification, updatedOrder});
    }
  }));

  res.status(200).json({success:true, message:"Updated Order.", data:updatedOrder})
}) //done1

export const myOrders = asyncHandler(async(req, res)=>{
  const userId = req.userId
  const customer = await prisma.customer.findUnique({
    where:{
      userId: userId
    }
  })

  if(!customer)
    throw new ResponseError("Customer does not exist.", 404)
  
  const orders = await prisma.order.findMany({ where: { customerId: customer.id } });
  
  res.status(200).json({ success: true, data: orders });
}) //done

export const getOrdersForToday = asyncHandler(async (req, res) => {
  const { date } = req.query;
  if (!date) {
    throw new ResponseError("Please provide all required fields");
  }

  const today = new Date(date)
  const orders = await prisma.order.findMany({
    where: { date: {
      gte: new Date(today.setHours(0,0,0,0))
    }}, 
    include:{
      customer: {
        include:{
          user: {
            select:{
              name: true
            }
          }
        }
    }
  },
  });
  res.status(200).json({ success: true, data: orders });
}); //done

export const markOrdersSeen = asyncHandler(async (req, res)=>{
  const {orderIds} = req.body;

  if(!orderIds || orderIds.length===0)
    throw new ResponseError("Please provide order ids", 400)

  // Get orders with customer info before updating
  const orders = await prisma.order.findMany({
    where: { id: { in: orderIds } },
    include: {
      customer: {
        include: {
          user: {
            select: {
              id: true,
            },
          },
        },
      },
    },
  });

  Promise.all(orderIds.map(async (id)=>{
    await prisma.order.update({
      where: { id },
      data: { status: "SEEN" },
    });
  }))

  // Notify customers their orders were seen
  Promise.all(orders.map(async (order) => {
    const socketId = await getRecieverSocketId(order.customer.user.id);
    const notification = await createNotification({
      senderId: req.userId,
      receiverId: order.customer.user.id,
      message: `Your ${order.type} order has been seen by the provider.`,
    });

    if (socketId && notification) {
      io.to(socketId).emit("orderSeenNotification", notification);
    }
  }));

  res.status(200).json({ success: true, message: "Orders marked as seen", orderIds });
}) //done

export const markOrdersDelivered = asyncHandler(async (req, res)=>{
  const {orderIds} = req.body;
  if(!orderIds || orderIds.length===0)
    throw new ResponseError("Please provide order ids", 400)

  // Get orders with customer info before updating
  const orders = await prisma.order.findMany({
    where: { id: { in: orderIds } },
    include: {
      customer: {
        include: {
          user: {
            select: {
              id: true,
            },
          },
        },
      },
    },
  });

  Promise.all(orderIds.map(async (id)=>{
    await deliveredAndPaid(id)
  }))

  // Notify customers their orders were delivered
  Promise.all(orders.map(async (order) => {
    const socketId = await getRecieverSocketId(order.customer.user.id);
    const notification = await createNotification({
      senderId: req.userId,
      receiverId: order.customer.user.id,
      message: `Your ${order.type} order has been delivered! Enjoy your meal.`,
    });

    if (socketId && notification) {
      io.to(socketId).emit("orderDeliveredNotification", notification);
    }
  }));

  res.status(200).json({ success: true, message: "Orders marked as delivered", orderIds });
}
) //done1

const deliveredAndPaid = async (id)=>{
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
    return updatedOrder;
}
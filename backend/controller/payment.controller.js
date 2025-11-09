import asyncHandler from "express-async-handler"
import prisma from "../config/db.js"
import ResponseError from "../types/ResponseError.js";
import { getRecieverSocketId, io } from "../config/socket.js";
import { createNotification } from "./notifications.controller.js";

export const amountAdded = asyncHandler(async(req, res)=>{
    const {userId} = req.params;
    let {amount} = req.body
    const originalAmount = amount; // Store original amount for notification

    const customer = await prisma.customer.findUnique({
        where:{
            id: userId
        }
    })

    if(!customer)
        throw new ResponseError("Customer not found", 404);

    const orders = await prisma.order.findMany({
        where:{
            customerId: userId,
            paid: false,
            status: 'DELIVERED'
        },
        orderBy:{
            createdAt: 'asc'
        }
    })

    for(const order of orders){
        if(amount >= order.totalAmt){
            await prisma.order.update({
                where:{
                    id: order.id
                },
                data:{
                    paid: true,
                }
            })
            amount -= order.totalAmt
        }
    }

    customer.wallet += amount;
    await prisma.customer.update({
        where:{
            id: userId
        },
        data:{
            wallet: customer.wallet
        }
    })

    // Notify customer about amount added
    const socketId = await getRecieverSocketId(customer.userId);
    const notification = await createNotification({
        senderId: req.userId,
        receiverId: customer.userId,
        message: `₹${originalAmount} have been added to your account. Current wallet balance: ₹${customer.wallet}`,
    });

    if (socketId && notification) {
        io.to(socketId).emit("updateWalletNotification", {notification , wallet: customer.wallet});
    }

    res.status(200).json({message: "Amount added successfully", wallet: customer.wallet})
})
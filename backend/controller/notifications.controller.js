import asyncHandler from "express-async-handler";
import ResponseError from "../types/ResponseError.js";
import prisma from "../config/db.js";

export const createNotification = asyncHandler(async({senderId, receiverId, message})=>{

    if(!senderId || !receiverId || !message){
        throw new ResponseError("Please provide all required fields");
    }

    const notification = await prisma.notification.create({
        data: {
            sender: { connect: { id: senderId } },
            receiver: { connect: { id: receiverId } },
            message,
        }
    });

    if(!notification){
        throw new ResponseError("Failed to create notification", 500);
    }

    return notification;
})
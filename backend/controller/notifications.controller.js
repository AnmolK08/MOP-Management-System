import asyncHandler from "express-async-handler";
import ResponseError from "../types/ResponseError.js";
import prisma from "../config/db.js";

export const createNotification = asyncHandler(async({senderId, receiverId, message})=>{

    if(!senderId || !receiverId || !message){
        throw new ResponseError("Please provide all required fields" , 400);
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

export const getNotificationsForUser = asyncHandler(async(req, res)=>{
    const userId = req.userId
        if(!userId)
            throw new ResponseError("Unauthenticated", 403)

    const notifications = await prisma.notification.findMany({
        where: { receiverId: userId },
        orderBy: { createdAt: 'desc' },
    });

    if(!notifications)
        throw new ResponseError("No notifications found", 404);

    res.status(200).json({success: true, message: "Notifications fetched", data: notifications});
});

export const deleteNotification = asyncHandler(async(req, res)=>{
    const userId = req.userId
    const notificationId = req.params.id;

    if(!userId)
        throw new ResponseError("Unauthenticated", 403)

    if(!notificationId)
        throw new ResponseError("Notification ID is required", 400);

    const notification = await prisma.notification.findUnique({
        where: { id: notificationId },
    });

    if(notification.length === 0)
        throw new ResponseError("Notification not found", 404);

    if(notification.receiverId !== userId)
        throw new ResponseError("You are not authorized to delete this notification", 403);

    await prisma.notification.delete({
        where: { id: notificationId },
    });

    res.status(200).json({success: true, message: "Notification deleted"});
});

export const clearNotificationsForUser = asyncHandler(async(req, res)=>{
    const userId = req.userId
    if(!userId)
        throw new ResponseError("Unauthenticated", 403)

    await prisma.notification.deleteMany({
        where: { receiverId: userId },
    });

    res.status(200).json({success: true, message: "All notifications cleared"});
});


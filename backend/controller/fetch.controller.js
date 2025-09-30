import asyncHandler from "express-async-handler";
import prisma from "../config/db.js";
import ResponseError from "../types/ResponseError.js";

export const fetchMenu = asyncHandler(async (_, res)=>{
    const date = new Date();

    const startDay = new Date(date.setHours(0,0,0,0));

    const menus = await prisma.menu.findMany({
        where:{
            date:{
                gte: startDay
            }
        }
    })

    if(!menus || menus.length==0)
        throw new ResponseError("No Menu Uploaded yet.", 404)

    res.status(200).json({success: true, message: "Menu of the day", data:menus})
}) //done

export const fetchUser = asyncHandler(async (req , res)=>{
    const userId = req.userId

    if(!userId)
        throw new ResponseError("Unauthenticated", 403)

    const user = await prisma.user.findUnique({
        where:{
            id: userId
        },
        omit:{
            password:true
        },
        include:{
            customer:true
        }
    })

    if(!user)
        throw new ResponseError("User not found.",404)

    res.status(200).json({success: true, message: "User data fetched", data:user})
}) //done
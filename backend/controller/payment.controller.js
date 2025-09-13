import asyncHandler from "express-async-handler"
import prisma from "../config/db.js"
import ResponseError from "../types/ResponseError.js";

export const amountAdded = asyncHandler(async(req, res)=>{
    const {userId} = req.params;
    let {amount} = req.body

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

    res.status(200).json({message: "Amount added successfully", wallet: customer.wallet})
})
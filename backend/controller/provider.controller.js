import asyncHandler from "express-async-handler";
import ResponseError from "../types/ResponseError.js";
import prisma from "../config/db.js";

export const menuUpload = asyncHandler(async (req, res) => {
    const {type, options} = req.body;
    if(!type || !options || options.length === 0) {
        throw new ResponseError("Please provide all required fields");
    }

    const menu = await prisma.menu.create({
        data: {
            type,
            options,
            date: new Date(),
        }});

    res.status(201).json({success: true, message: "Menu uploaded successfully", data: menu});
}); //done

export const deleteMenu = asyncHandler(async (req, res) => {
    const {id} = req.params;
    if(!id) {
        throw new ResponseError("Please provide menu id");
    }
    const menu = await prisma.menu.delete({where: {id: id}});
    
    res.status(200).json({success: true, message: "Menu deleted successfully", data: menu});
}); //done
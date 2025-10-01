import asyncHandler from "express-async-handler";
import ResponseError from "../types/ResponseError.js";
import prisma from "../config/db.js";

export const menuUpload = asyncHandler(async (req, res) => {
  const { type, options } = req.body;
  if (!type || !options || options.length === 0) {
    throw new ResponseError("Please provide all required fields");
  }

  const menu = await prisma.menu.create({
    data: {
      type,
      options,
      date: new Date(),
    },
  });

  res
    .status(201)
    .json({ success: true, message: "Menu uploaded successfully", data: menu });
}); //done

export const deleteMenu = asyncHandler(async (req, res) => {
  const { id } = req.params;
  if (!id) {
    throw new ResponseError("Please provide menu id");
  }
  const menu = await prisma.menu.delete({ where: { id: id } });

  res
    .status(200)
    .json({ success: true, message: "Menu deleted successfully", data: menu });
}); //done

export const updateMenu = asyncHandler(async (req, res) => {
  const { menuId } = req.params;
  const { type, options } = req.body;

  if (!menuId || !type || !options || options.length == 0)
    throw new ResponseError("All the fields are required", 401);

  const menu = await prisma.menu.update({
    where: { id: menuId },
    data: {
      type,
      options,
    },
  });

  if (!menu) throw new ResponseError("Menu does not exist", 404);

  res
    .status(201)
    .json({ success: true, message: "Menu uploaded successfully", data: menu });
}); //done

export const getLatestMenu = asyncHandler(async (req, res) => {
  const date = new Date();

  const startDay = new Date(date.setHours(0, 0, 0, 0));

  const menus = await prisma.menu.findMany({
    where: {
      date: {
        gte: startDay,
      },
    },
  });

  if (!menus || menus.length == 0)
    throw new ResponseError("No Menu Uploaded yet.", 404);

  res
    .status(200)
    .json({ success: true, message: "Menu of the day", data: menus });
}); // done

export const getAllUsers = asyncHandler(async (req, res) => {
  const users = await prisma.user.findMany({
    where: { role: "CUSTOMER" },
    select: {
      id: true,
      name: true,
      email: true,
      role: true,
      createdAt: true,
      customer: {
        select: {
          premium: true,
          wallet: true,
        },
      },
    },
  });

  res.status(200).json({
    success: true,
    message: "Users fetched successfully",
    data: users,
  });
}); //done

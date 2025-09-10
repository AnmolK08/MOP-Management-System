import asyncHandler from "express-async-handler";
import ResponseError from "../types/ResponseError.js";
import prisma from "../config/db.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import nodemailer from "nodemailer";

export const login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    throw new ResponseError("Please provide email and password", 400);
  }
  const user = await prisma.user.findUnique({ where: { email } });
  if (!user) {
    throw new ResponseError("Invalid email or password", 401);
  }
  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) {
    throw new ResponseError("Invalid email or password", 401);
  }

  const token = jwt.sign(
    { userId: user.id, role: user.role },
    process.env.JWT_SECRET,
    { expiresIn: "1d" }
  );

  res.cookie("token", token, {
    httpOnly: true,
    secure: true,
  });

  res.status(200).json({ success: true, message: "Login successful", data: token });
});

export const register = asyncHandler(async (req, res) => {
  const { email, password, role, name } = req.body;

  if (!email || !password || !role || !name) {
    throw new ResponseError("Please provide all required fields", 400);
  }

  const userExists = await prisma.user.findUnique({ where: { email } });
  if (userExists) {
    throw new ResponseError("User already exists", 400);
  }

  const hashedPassword = await bcrypt.hash(password, 10);

    const token = jwt.sign(
    { email, hashedPassword, name, role },
    process.env.JWT_SECRET,
    {
      expiresIn: "5m",
    }
  );

  const verificationLink = `http://localhost:8080/auth/verify-email?token=${token}`;

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL,
      pass: process.env.EMAIL_PASS,
    },
  });

  await transporter.sendMail({
    from: process.env.EMAIL,
    to: email,
    subject: "Verify your email",
    html: `<p>Click the link to verify:</p><a href="${verificationLink}">${verificationLink}</a>`,
  });

  res.status(200).json({ success: true, message: "Email sent successful" });
});

export const verifyEmail = asyncHandler(async (req, res) => {
  const { token } = req.query;

  if (!token) {
    throw new ResponseError("Token is required", 400);
  }

  const decoded = jwt.verify(token, process.env.JWT_SECRET);

  if (!decoded) {
    throw new ResponseError("Invalid token", 401);
  }
  const { email, hashedPassword, name, role } = decoded;

  const user = await prisma.user.create({
    data: {
      email,
      password: hashedPassword,
      role,
      name,
    },
  });
  if (!user) {
    throw new ResponseError("Failed to create user", 500);
  }

  if (role === "CUSTOMER") {
    await prisma.customer.create({
      data: {
        userId: user.id,
      },
    });
  }

//   const redirectUrl = `http://localhost:5173/login`;
//   res.redirect(redirectUrl);

  res.json({
    success: true,
    message: "Email verified and User registered successfully",
  });
});

export const logout = asyncHandler(async (req, res) => {
    res.clearCookie("token");
    res.status(200).json({ success: true, message: "Logged out successfully" });
});

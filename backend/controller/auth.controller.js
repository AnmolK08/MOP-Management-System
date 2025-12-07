import asyncHandler from "express-async-handler";
import ResponseError from "../types/ResponseError.js";
import prisma from "../config/db.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { sendMail } from "../utils/Brevoemail.js";

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

  const accessToken = jwt.sign(
    { userId: user.id, role: user.role },
    process.env.ACCESS_TOKEN_SECRET,
    { expiresIn: "30m" }
  );

  const refreshToken = jwt.sign(
    { userId: user.id },
    process.env.REFRESH_TOKEN_SECRET,
    { expiresIn: "7d" }
  );

  res.cookie("refreshToken", refreshToken, {
    httpOnly: true,
    secure: true,
    sameSite: 'None',
    maxAge: 7 * 24 * 60 * 60 * 1000,
  });

  res.status(200).json({
    success: true,
    message: "Login successful",
    accessToken: accessToken,
    user: {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
    },
  });
});

export const refresh = asyncHandler(async (req, res) => {
    const cookies = req.cookies;

    if (!cookies?.refreshToken) return res.status(401).json({ message: 'Unauthorized' });

    const refreshToken = cookies.refreshToken;

    try {
        const decoded = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET);
        
        const user = await prisma.user.findUnique({ where: { id: decoded.userId } });

        if (!user) return res.status(401).json({ message: 'Unauthorized' });

        const accessToken = jwt.sign(
            { userId: user.id, role: user.role },
            process.env.ACCESS_TOKEN_SECRET,
            { expiresIn: '2m' }
        );

        res.json({ accessToken });
    } catch (err) {
        return res.status(403).json({ message: 'Forbidden' });
    }
});

export const register = asyncHandler(async (req, res) => {
  const { email, password, name } = req.body;

  if (!email || !password || !name) {
    throw new ResponseError("Please provide all required fields", 400);
  }

  const userExists = await prisma.user.findUnique({ where: { email } });
  if (userExists) {
    throw new ResponseError("User already exists", 400);
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const token = jwt.sign(
    { email, hashedPassword, name },
    process.env.JWT_SECRET,
    {
      expiresIn: "30m",
    }
  );

  const verificationLink = `https://mop-management-system.onrender.com/auth/verify-email?token=${token}`;

  // const transporter = nodemailer.createTransport({
  //   service: "gmail",
  //   auth: {
  //     user: process.env.EMAIL,
  //     pass: process.env.EMAIL_PASS,
  //   },
  //   debug: true,
  //   logger: true,
  await sendMail(
    email,
    "Verify your email - Minipahadganj",
    `
        <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; padding: 20px; max-width: 600px; margin: auto; border: 1px solid #eee; border-radius: 10px;">
            <h2 style="color: #ff7849; text-align: center;">Welcome to Minipahadganj</h2>
            <p>Hi there,</p>
            <p>Thanks for signing up! Please verify your email address to activate your account.</p>
            <div style="text-align: center; margin: 30px 0;">
                <a href="${verificationLink}"
                   style="background-color: #ff7849; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; font-weight: bold; display: inline-block;">
                    Verify Email
                </a>
            </div>
            <p style="margin-top: 16px; font-size: 14px; color: #555;">
                This link will expire in <b>5 minutes</b> for your security.
            </p>
            <p style="margin-top: 8px; font-size: 14px; color: #555;">
                If you notice any error or discrepancy, please contact the undersigned at
                <a href="mailto:theminiteam7@gmail.com" style="color:#ff7849; text-decoration:none;">theminiteam7@gmail.com</a>.
            </p>
            <p style="margin-top: 24px; font-size: 14px; color: #555;">
                Cheers,<br><b>The Mini Team</b>
            </p>
        </div>
    `
  );

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
  const { email, hashedPassword, name } = decoded;

  const user = await prisma.user.create({
    data: {
      email,
      password: hashedPassword,
      role: "CUSTOMER",
      name,
    },
  });
  if (!user) {
    throw new ResponseError("Failed to create user", 500);
  }

  await prisma.customer.create({
    data: {
      userId: user.id,
    },
  });

  const FRONTEND_URL = process.env.FRONTEND_URL || "http://localhost:5173";
  const redirectUrl = `${FRONTEND_URL}/login?verified=true`;
  res.redirect(redirectUrl);

  res.json({
    success: true,
    message: "Email verified and User registered successfully",
  });
});

export const logout = asyncHandler(async (req, res) => {
  const cookies = req.cookies;
  if (!cookies?.refreshToken) return res.sendStatus(204); // No content
  res.clearCookie("refreshToken", { httpOnly: true, sameSite: 'None', secure: true });
  res.status(200).json({ success: true, message: "Logged out successfully" });
});

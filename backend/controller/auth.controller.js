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

  const token = jwt.sign(
    { userId: user.id, role: user.role },
    process.env.JWT_SECRET,
    { expiresIn: "1d" }
  );

  res.cookie("token", token, {
    httpOnly: true,
    secure: true,
  });

  res.status(200).json({
    success: true,
    message: "Login successful",
    token: token,
    user: {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
    },
  });
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
      expiresIn: "5m",
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
  // });

await sendMail(
  email,
   "Verify your email - Minipahadganj",
  `
    <!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <meta name="x-apple-disable-message-reformatting">
    <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
    <title>Verify your email</title>
  </head>
  <body style="margin:0; padding:0; background-color:#f6f6f6;">
    <center style="width:100%; background-color:#f6f6f6;">
      <!-- Preheader (hidden) -->
      <div style="display:none; font-size:1px; line-height:1px; max-height:0; max-width:0; opacity:0; overflow:hidden;">
        Confirm your email to unlock personalized menus, offers, and faster ordering at Minipahadganj.
      </div>

      <table role="presentation" cellpadding="0" cellspacing="0" width="100%">
        <tr>
          <td align="center" style="padding:28px 12px;">
            <table role="presentation" cellpadding="0" cellspacing="0" width="600" style="width:600px; max-width:100%;">
              <!-- Brand -->
              <tr>
                <td align="center" style="padding-bottom:16px;">
                  <a href="https://minipahadganj.example" style="text-decoration:none;">
                    <span style="display:inline-block; font-family:Arial, sans-serif; font-size:13px; letter-spacing:2px; color:#ff7849; text-transform:uppercase;">
                      Minipahadganj
                    </span>
                  </a>
                </td>
              </tr>

              <!-- Card -->
              <tr>
                <td style="background:#ffffff; border:1px solid #eaeaea; border-radius:12px; overflow:hidden;">
                  <!-- Hero -->
                  <img src="https://images.unsplash.com/photo-1544025162-d76694265947?q=80&w=1200&auto=format&fit=crop"
                       alt="Fresh, vibrant plates from our kitchen"
                       width="600"
                       style="display:block; width:100%; height:auto; border:0;">

                  <!-- Content -->
                  <table role="presentation" cellpadding="0" cellspacing="0" width="100%">
                    <tr>
                      <td style="padding:24px 28px 8px 28px;">
                        <h2 style="margin:0 0 8px 0; font-family:Arial, sans-serif; font-size:24px; line-height:1.3; color:#1f2937;">
                          Welcome to Minipahadganj, {{customerName}}!
                        </h2>
                        <p style="margin:0; font-family:Arial, sans-serif; font-size:16px; line-height:1.6; color:#4b5563;">
                          Verify your email to start exploring this week’s seasonal specials, chef’s picks, and exclusive member‑only offers. One tap, and you’re in.
                        </p>
                      </td>
                    </tr>

                    <!-- CTA -->
                    <tr>
                      <td align="center" style="padding:22px 28px;">
                        <a href="{{verificationLink}}"
                           style="background-color:#ff7849; color:#ffffff; font-family:Arial, sans-serif; font-weight:bold; font-size:16px; line-height:1; text-decoration:none; padding:14px 26px; border-radius:8px; display:inline-block;">
                          Verify Email
                        </a>
                      </td>
                    </tr>

                    <!-- Secondary info -->
                    <tr>
                      <td style="padding:0 28px 8px 28px;">
                        <p style="margin:0; font-family:Arial, sans-serif; font-size:14px; line-height:1.7; color:#6b7280;">
                          If the button doesn’t work, copy and paste this link into your browser:
                        </p>
                        <p style="margin:8px 0 0 0; font-family:Arial, sans-serif; font-size:13px; line-height:1.6; color:#2563eb; word-break:break-all;">
                          {{verificationLink}}
                        </p>
                      </td>
                    </tr>

                    <!-- Expiry and security -->
                    <tr>
                      <td style="padding:16px 28px 0 28px;">
                        <p style="margin:0; font-family:Arial, sans-serif; font-size:13px; line-height:1.6; color:#6b7280;">
                          For your security, this link will expire in <b style="color:#111827;">5 minutes</b>. If you didn’t create an account, you can safely ignore this email.
                        </p>
                      </td>
                    </tr>

                    <!-- Divider -->
                    <tr>
                      <td style="padding:24px 28px 0 28px;">
                        <hr style="border:0; border-top:1px solid #eeeeee; margin:0;">
                      </td>
                    </tr>

                    <!-- Foodie footer/brand voice -->
                    <tr>
                      <td style="padding:18px 28px 8px 28px;">
                        <p style="margin:0; font-family:Arial, sans-serif; font-size:14px; line-height:1.7; color:#4b5563;">
                          Pro tip: Look out for our mid‑week chef’s specials and weekend comfort bowls—crafted fresh, with seasonal produce and homestyle flavors.
                        </p>
                      </td>
                    </tr>

                    <!-- Signature -->
                    <tr>
                      <td style="padding:6px 28px 28px 28px;">
                        <p style="margin:0; font-family:Arial, sans-serif; font-size:14px; line-height:1.7; color:#4b5563;">
                          Warmly,<br>
                          <b style="color:#111827;">The Mini Team</b>
                        </p>
                      </td>
                    </tr>
                  </table>
                </td>
              </tr>

              <!-- Legal/footer -->
              <tr>
                <td align="center" style="padding:16px 10px 0 10px;">
                  <p style="margin:0; font-family:Arial, sans-serif; font-size:12px; line-height:1.7; color:#9ca3af;">
                    Need help? Email us at <a href="mailto:{{supportEmail}}" style="color:#ff7849; text-decoration:none;">{{supportEmail}}</a>
                  </p>
                  <p style="margin:6px 0 0 0; font-family:Arial, sans-serif; font-size:12px; line-height:1.7; color:#9ca3af;">
                    {{restaurantAddress}}
                  </p>
                  <p style="margin:6px 0 0 0; font-family:Arial, sans-serif; font-size:12px; line-height:1.7; color:#9ca3af;">
                    You received this email because you signed up at Minipahadganj. If this wasn’t you, please ignore this message.
                  </p>
                </td>
              </tr>

              <tr>
                <td align="center" style="padding:10px 0 30px 0;">
                  <a href="https://minipahadganj.example/preferences" style="font-family:Arial, sans-serif; font-size:12px; color:#9ca3af; text-decoration:underline;">
                    Email preferences
                  </a>
                </td>
              </tr>
            </table>
          </td>
        </tr>
      </table>

    </center>
  </body>
</html>

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
  res.clearCookie("token");
  res.status(200).json({ success: true, message: "Logged out successfully" });
});

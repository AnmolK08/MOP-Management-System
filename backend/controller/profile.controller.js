import asyncHandler from "express-async-handler";
import ResponseError from "../types/ResponseError.js";
import prisma from "../config/db.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken"
import nodemailer from "nodemailer";

export const editPass = asyncHandler(async (req, res) => {

        const { oldPass, newPass, confPass } = req.body;

        if (!oldPass || !newPass || !confPass) {
        throw new ResponseError("Please provide all required fields", 400);
        }
        if (newPass !== confPass) {
        throw new ResponseError("New password and confirmation password do not match", 400);
        }

        const user = await prisma.user.findUnique({
            where: { id: req.userId },
        });

        const isMatch = await bcrypt.compare(oldPass, user.password);
        if (!isMatch) {
            throw new ResponseError("Old password is incorrect", 401);
        }

        const hashedPassword = await bcrypt.hash(newPass, 10);

        await prisma.user.update({
            where: { id: req.userId },
            data: { password: hashedPassword },
        });
        
        return res.json({
            success: true,
            message: "Password updated successfully",
        });
})// done

export const forgetPass = asyncHandler(async(req, res)=>{
    const {email} = req.body;

    const user = await prisma.user.findUnique({
        where:{
            email: email
        }
    })

    if(!user)
        throw new ResponseError("User not found.",404)

    const token = jwt.sign(
        { email: user.email },
        process.env.JWT_SECRET,
        {
          expiresIn: "5m",
        }
    );

    await prisma.user.update({
        where:{
            email: email
        },
        data:{
            token: token
        }
    })

    const resetLink = `${process.env.FRONTEND_URL}/reset-password?token=${token}`;

    // Send email with the reset link
    const transporter = nodemailer.createTransport({
        service: 'Gmail',
        auth: {
            user: process.env.EMAIL,
            pass: process.env.EMAIL_PASS,
        },
    });
    const mailOptions = {
        from: process.env.EMAIL,
        to: user.email,
        subject: 'Password Reset',
        text: `Click the link to reset your password: ${resetLink}`,
    };
    await transporter.sendMail(mailOptions);

    res.json({
        success: true,
        message: 'Password reset link has been sent to your email.',
    });
}) //done

export const resetPass = asyncHandler(async(req, res)=>{
    const {token, newPass, confPass} = req.body;
    if(!token || !newPass || !confPass)
        throw new ResponseError("Please provide all required fields", 400);
    
    if(newPass !== confPass)
        throw new ResponseError("New password and confirmation password do not match", 400);
    
    let email;
    try{
        const decoded = jwt.verify(token, process.env.JWT_SECRET);        
        email = decoded.email;
    }catch(err){
        throw new ResponseError("Invalid or expired token", 400);
    }
    
    const user = await prisma.user.findUnique({
        where:{
            email: email
        }
    })
    if(!user)
        throw new ResponseError("User not found.",404)

    if(user.token !== token)
        throw new ResponseError("Invalid or expired token", 400);

    const hashedPassword = await bcrypt.hash(newPass, 10);

    await prisma.user.update({
        where: { email: email },
        data: { password: hashedPassword, token: "" },
    });

    res.json({
        success: true,
        message: "Password has been reset successfully.",
    });
})// done




        
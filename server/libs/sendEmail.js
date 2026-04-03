import { OTPEmail } from "../email/OTPEmail.js";
import nodemailer from "nodemailer";

import "dotenv/config.js";
import AppError from "../utils/AppError.js";
import { resendOTP } from "../email/resendOTP.js";

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true, // true for 465, false for other ports
  auth: {
    user: process.env.GMAIL,
    pass: process.env.GMAILPASSWORD,
  },
});

export async function sendOTP(email, otp, next, res, data) {
  const html = OTPEmail({ otp });
  try {
    const info = await transporter.sendMail({
      from: `"Circle"`,
      to: email,
      subject: "Email verification",
      html,
    });
    res
      .status(200)
      .json({ status: 200, message: "OTP Send successfully", data });
    console.log("Message sent:", info.messageId);
  } catch (error) {
    next(new AppError("something went wrong, Try again later", 500));
    console.log(error.message);
  }
}

export async function resendOTPEmail(email, otp, res, data, next) {
  const html = resendOTP({ otp });
  try {
    const info = await transporter.sendMail({
      from: `"Circle"`,
      to: email,
      subject: "Email verification",
      html,
    });
    res
      .status(200)
      .json({ status: 200, message: "OTP Send successfully", data });
    console.log("Message sent:", info.messageId);
  } catch (error) {
    next(new AppError("something went wrong, Try again later", 500));
    console.log(error.message);
  }
}

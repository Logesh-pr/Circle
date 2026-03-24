import { OTPEmail } from "../email/OTPEmail.js";
import nodemailer from "nodemailer";

import "dotenv/config.js";

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true, // true for 465, false for other ports
  auth: {
    user: process.env.GMAIL,
    pass: process.env.GMAILPASSWORD,
  },
});

export async function sendOTP() {
  const html = OTPEmail();
  try {
    const info = await transporter.sendMail({
      from: `"Circle"`,
      to: email,
      subject: "Email verification",
      html,
    });

    console.log("Message sent:", info.messageId);
  } catch (error) {
    console.log(error.message);
  }
}

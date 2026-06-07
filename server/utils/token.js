import jwt from "jsonwebtoken";
import "dotenv/config.js";
import AppError from "./AppError.js";

export const generateAccessToken = (user) => {
  return jwt.sign(
    { sub: user._id, tokenVersion: user.tokenVersion },
    process.env.JWT_ACCESS_SECRET,
    {
      expiresIn: "15m",
    },
  );
};

export const generateRefreshToken = (sessionId, userId) => {
  return jwt.sign({ sessionId, userId }, process.env.JWT_REFRESH_SECRET, {
    expiresIn: "7d",
  });
};

export const generateOTPToken = (email) => {
  return jwt.sign(
    { email, purpose: "otp_verification" },
    process.env.JWT_OTP_TOKEN_SECRET,
    {
      expiresIn: "10m",
    },
  );
};

export const generateUsernameToken = (userId) => {
  return jwt.sign(
    { userId, purpose: "username_verification" },
    process.env.JWT_USERNAME_TOKEN_SECRET,
    {
      expiresIn: "5m",
    },
  );
};

export const verifyToken = async (token, secret, next) => {
  try {
    return jwt.verify(token, secret);
  } catch (err) {
    next(new AppError("Invalid or expired token", 500));
  }
};

import "dotenv/config.js";

//model
import User from "../models/user.model.js";
import catchAsync from "../utils/catchAsync.js";
import TempUser from "../models/tempUser.model.js";

//utils
import { verifyToken } from "../utils/token.js";
import AppError from "../utils/AppError.js";

export const verify = catchAsync(async (req, res, next) => {
  const token = req.cookies.accessToken;

  if (!token) {
    return next(new AppError("no token", 401));
  }
  const decoded = await verifyToken(token, process.env.JWT_ACCESS_SECRET);

  const user = await User.findById(decoded.sub);

  if (!user || user.tokenVersion !== decoded.tokenVersion) {
    return next(new AppError("Unauthorized", 401));
  }

  req.user = decoded.sub;

  next();
});

export const verifyOTPToken = catchAsync(async (req, res, next) => {
  const token = req.cookies.otpToken;
  console.log(req.cookies.otpToken);
  if (!token) {
    return next(new AppError("opt section expiry, Try signup again", 401));
  }

  const decoded = await verifyToken(token, process.env.JWT_OTP_TOKEN_SECRET);
  console.log(decoded.email);
  const user = await TempUser.findOne({ email: decoded.email });

  if (!user) {
    return next(new AppError("user expiry, Try signup again", 401));
  }

  console.log(decoded);

  const userData = {
    email: decoded.email,
    purpose: decoded.purpose,
  };

  req.user = userData;

  next();
});

export const verifyUsernameToken = catchAsync(async (req, res, next) => {
  const usernameToken = req.cookies.usernameToken;
  console.log("verify", req.cookies);

  if (!usernameToken) {
    return next(new AppError("unauthorized", 410));
  }

  const decoded = await verifyToken(
    usernameToken,
    process.env.JWT_USERNAME_TOKEN_SECRET,
    next,
  );

  const user = await TempUser.findById(decoded.userId);

  if (!user) {
    return next(new AppError("user expires, Try signup again", 401));
  }

  console.log("token", decoded, user);
  const userData = {
    userId: decoded.userId,
    purpose: decoded.purpose,
  };

  req.user = userData;

  next();
});

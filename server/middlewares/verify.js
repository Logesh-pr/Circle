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
    next(new AppError("user expiry, Try signup again", 401));
  }

  console.log(decoded);

  const userDate = {
    email: decoded.email,
    purpose: decoded.purpose,
  };

  req.user = userDate;

  next();
});

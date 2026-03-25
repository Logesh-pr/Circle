import jwt from "jsonwebtoken";
import "dotenv/config.js";
//model
import User from "../models/user.model.js";
import catchAsync from "../utils/catchAsync.js";

const verify = catchAsync(async (req, res, next) => {
  const token = req.cookies.accessToken;

  if (!token) {
    return next(new AppError("no token", 401));
  }

  const decoded = await jwt.verify(token, process.env.JWT_ACCESS_SECRET);

  const user = await User.findById(decoded.userId);

  if (!user || user.tokenVersion !== decoded.tokenVersion) {
    return next(new AppError("Unauthorized", 401));
  }

  req.user = decoded.sub;

  next();
});

export default verify;

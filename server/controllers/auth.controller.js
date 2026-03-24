//utilis
import AppError from "../libs/AppError.js";
import catchAsync from "../libs/catchAsync.js";
import { generateOTP } from "../libs/otp.js";

//model
import User from "../models/user.model.js";
import TempUser from "../models/tempUser.model.js";

//express validation
import { validationResult } from "express-validator";

import { sendOTP } from "../libs/sendEmail.js";

export const checkUsername = catchAsync(async (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return next(
      new AppError(
        errors
          .array()
          .map((err) => err.msg)
          .join(", "),
        400,
      ),
    );
  }

  const { username } = req.body;

  const checkUser = await User.findOne({ username });

  if (!checkUser) {
    return res
      .status(200)
      .json({ status: 200, message: "username is available" });
  }

  return next(new AppError("username is already taken", 409));
});

export const signup = catchAsync(async (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return next(
      new AppError(
        errors
          .array()
          .map((err) => err.msg)
          .join(", "),
        400,
      ),
    );
  }

  const { email, password } = req.body;

  const checkUser = await TempUser.findOne({ email });

  if (checkUser) {
    return next(AppError("user is already exists", 409));
  }
  const otp = generateOTP();
  const user = await TempUser.create({ email, password, otp });

  if (user) {
    return res
      .status(200)
      .json({ status: 200, message: "user successfully created" });
  }
});

export const email = catchAsync(async (req, res, next) => {
  sendOTP();
});

//utilis
import AppError from "../libs/AppError.js";
import catchAsync from "../libs/catchAsync.js";

//model
import User from "../models/user.model.js";

//express validation
import { validationResult } from "express-validator";

import { sendOTPEmail } from "../libs/sendEmail.js";

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

export const email = catchAsync(async (req, res, next) => {
  sendOTPEmail();
});

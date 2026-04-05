import crypto from "crypto";
import "dotenv/config.js";

//utilis
import AppError from "../utils/AppError.js";
import catchAsync from "../utils/catchAsync.js";
import { generateOTP, hashOTP, verifyHashedOTP } from "../utils/otp.js";
import { generateHash } from "../utils/hash.js";
import {
  generateAccessToken,
  generateOTPToken,
  generateRefreshToken,
  verifyToken,
} from "../utils/token.js";
import handleValidationError from "../utils/handleValidationErrors.js";

//model
import User from "../models/user.model.js";
import TempUser from "../models/tempUser.model.js";
import Session from "../models/session.model.js";

//express validation
import { validationResult } from "express-validator";

//libs
import { sendOTP, resendOTPEmail } from "../libs/sendEmail.js";
import { setCookies, setOTPCookie } from "../libs/setCookies.js";
import clearCookies from "../libs/clearCookies.js";

export const checkUsername = catchAsync(async (req, res, next) => {
  if (handleValidationError(req, next)) return;

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

  const checkUser =
    (await TempUser.findOne({ email })) || (await User.findOne({ email }));
  console.log(checkUser);
  if (checkUser) {
    return next(new AppError("There is an account in this email", 409));
  }

  const otp = generateOTP();
  const hashedOTP = await hashOTP(otp);
  const user = await TempUser.create({
    email,
    password,
    otp: hashedOTP,
    otpExpires: new Date(Date.now() + 10 * 60 * 1000),
    resendAvailableAt: new Date(Date.now()),
  });
  const otpToken = generateOTPToken(email);
  setOTPCookie(res, otpToken);
  const data = {
    resendAvailableAt: user.resendAvailableAt,
    resendAttempts: user.resendAttempts,
  };
  await sendOTP(email, otp, next, res, data);
});

export const checkOTPStatus = catchAsync(async (req, res, next) => {
  const email = req.user;
  console.log("email", email);
  if (!email) {
    return next(new AppError("unauthorized", 410));
  }
  return res
    .status(200)
    .json({ status: 200, message: "Successfully verify otp" });
});

export const resendOTP = catchAsync(async (req, res, next) => {
  const email = req.user;
  const tempUser = await TempUser.findOne({ email });
  console.log(tempUser);
  if (!tempUser) {
    return next(new AppError("user expired. signup again", 410));
  }

  if (tempUser.resendAttempts >= 3) {
    return next(
      new AppError("You reached the maximum otp limit, Try signup again", 429),
    );
  }

  if (Date.now() < tempUser.resendAvailableAt.getTime()) {
    const waitSeconds = Math.ceil(
      (tempUser.resendAvailableAt.getTime() - Date.now()) / 1000,
    );
    return next(new AppError(`wait for ${waitSeconds}s seconds`, 400));
  }

  const otp = generateOTP();
  const hashedOTP = await hashOTP(otp);

  tempUser.otp = hashedOTP;
  tempUser.otpExpires = new Date(Date.now() + 5 * 60 * 1000);
  tempUser.resendAttempts += 1;
  tempUser.resendAvailableAt = new Date(Date.now() + 30 * 1000);

  await tempUser.save();
  const data = {
    resendAvailableAt: tempUser.resendAvailableAt,
    resendAttempts: tempUser.resendAttempts,
  };
  await resendOTPEmail(email, otp, res, data, next);
});

export const verifyOTP = catchAsync(async (req, res, next) => {
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

  const email = req.user;
  const { otp } = req.body;

  const tempUser = await TempUser.findOne({ email });

  if (!tempUser) {
    return next(new AppError("user expired, Try signup again", 410));
  }

  if (Date.now() > tempUser.otpExpires.getTime()) {
    return next(new AppError("OTP expired, Try signup again", 400));
  }

  const verify = await verifyHashedOTP(otp, tempUser.otp);

  if (!verify) {
    tempUser.otpAttempts += 1;
    await tempUser.save();
    return next(new AppError("Invalid OTP", 400));
  }

  const username = `circle_User_${crypto.randomInt(1000, 9999)}${crypto.randomInt(10, 99)}`;

  const user = await User.create({
    username,
    email: tempUser.email,
    password: tempUser.password,
    isVerified: true,
    authType: "credentials",
  });

  await TempUser.deleteOne({ email });

  if (user) {
    const sessionId = crypto.randomUUID();
    const refreshToken = generateRefreshToken(sessionId, user._id.toString());
    const hashedToken = await generateHash(refreshToken);
    const hashedUserId = await generateHash(user._id.toString());

    await Session.create({
      _id: sessionId,
      userId: hashedUserId,
      refreshToken: hashedToken,
    });

    const accessToken = await generateAccessToken(user);
    setCookies(res, accessToken, refreshToken);

    res.status(200).json({
      status: 200,
      message: "Successfully created token",
      data: {
        username,
      },
    });
  } else {
    return next(new AppError("something went wrong, Try signup again", 400));
  }
});

export const login = catchAsync(async (req, res, next) => {
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

  const user = await User.findOne({ email });

  if (!user) {
    return next(new AppError("Invalid credentials", 400));
  }

  const checkPassword = user.comparePassword(password);

  if (!checkPassword) {
    return next(new AppError("Invalid credentials", 400));
  }

  const sessionId = crypto.randomUUID();
  const refreshToken = generateRefreshToken(sessionId, user._id.toString());
  const hashedToken = await generateHash(refreshToken);
  const hashedUserId = await generateHash(user._id.toString());

  await Session.create({
    _id: sessionId,
    userId: hashedUserId,
    refreshToken: hashedToken,
  });

  const accessToken = await generateAccessToken(user);
  setCookies(res, accessToken, refreshToken);

  return res
    .status(200)
    .json({ status: 200, message: "Successfully logged in" });
});

export const refresh = catchAsync(async (req, res, next) => {
  const token = req.cookies.refreshToken;

  if (!token) {
    return next(new AppError("Invalid token", 401));
  }

  const decoded = await jwt.verifyToken(
    token,
    process.env.JWT_REFRESH_SECRET,
    next,
  );

  const session = await Session.findById(decoded.sessionId);
  if (!session) {
    return next(new AppError("Invalid session", 401));
  }

  const isValid = await verifyHash(token, session.refreshToken);
  if (!isValid) {
    return next(new AppError("Invalid token", 401));
  }

  const user = await User.findById(decoded.userId);

  //Token Rotation

  await Session.deleteOne({ _id: session._id });

  const sessionId = crypto.randomUUID();
  const refreshToken = generateRefreshToken(sessionId, user._id.toString());
  const hashedToken = await generateHash(refreshToken);
  const hashedUserId = await generateHash(user._id.toString());

  await Session.create({
    _id: sessionId,
    userId: hashedUserId,
    refreshToken: hashedToken,
  });

  const accessToken = await generateAccessToken(user);

  setCookies(res, accessToken, refreshToken);

  return res.status(200).json({ status: 200, message: "New token issued" });
});

export const logout = catchAsync(async (req, res) => {
  const token = req.cookies.refreshToken;

  if (token) {
    const decoded = verifyToken(token, process.env.JWT_REFRESH_SECRET);

    await Session.deleteOne({ _id: decoded.sessionId });
  }

  clearCookies(res);

  return res
    .status(200)
    .json({ status: 200, message: "Successfully logged out" });
});

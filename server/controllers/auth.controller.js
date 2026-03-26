import crypto from "crypto";

//utilis
import AppError from "../utils/AppError.js";
import catchAsync from "../utils/catchAsync.js";
import { generateOTP, hashOTP, verifyHashedOTP } from "../utils/otp.js";
import { generateHash } from "../utils/hash.js";
import {
  generateAccessToken,
  generateRefreshToken,
  verifyRefreshToken,
} from "../utils/token.js";

//model
import User from "../models/user.model.js";
import TempUser from "../models/tempUser.model.js";
import Session from "../models/session.model.js";

//express validation
import { validationResult } from "express-validator";

//libs
import { sendOTP, resendOTPEmail } from "../libs/sendEmail.js";
import setCookies from "../libs/setCookies.js";
import clearCookies from "../libs/clearCookies.js";

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

  const checkUser =
    (await TempUser.findOne({ email })) || (await User.findOne({ email }));

  if (checkUser) {
    return next(new AppError("user is already exists", 409));
  }

  const otp = generateOTP();
  const hashedOTP = await hashOTP(otp);
  const user = await TempUser.create({
    email,
    password,
    otp: hashedOTP,
    otpExpires: Date.now() + 5 * 60 * 1000,
    resendAvailableAt: Date.now(),
  });
  await sendOTP(email, otp, next, res);
});

export const resendOTP = catchAsync(async (req, res, next) => {
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
  const { email } = req.body;

  const user = await TempUser.findOne({ email });

  if (!user) {
    return next(new AppError("user expired. signup again", 400));
  }

  if (user.resendAttempts >= 3) {
    return next(
      new AppError("You reached the maximum otp limit, Try signup again"),
    );
  }

  if (Date.now() < user.resendAvailableAt) {
    return next(new AppError("wait for 30 seconds", 400));
  }

  const otp = generateOTP();
  const hashedOTP = await hashOTP(otp);

  user.otp = hashedOTP;
  user.otpExpires = Date.now() + 5 * 60 * 1000;
  user.resendAttempts += 1;
  user.resendAvailableAt = Date.now() + 30 * 1000;

  await user.save();

  await resendOTPEmail(email, otp, res, next);
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

  const { email, otp } = req.body;

  const tempUser = await TempUser.findOne({ email });

  if (!tempUser) {
    return next(new AppError("user expired, Try signup again", 400));
  }

  if (Date.now > tempUser.otpExpires) {
    return next(new AppError("OTP expired, Try signup again", 400));
  }

  const verify = await verifyHashedOTP(otp, tempUser.otp);

  if (!verify) {
    tempUser.otpAttemps += 1;
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

    res
      .status(200)
      .json({ status: 200, message: "Successfully created token" });
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

  const decoded = await jwt.verify(token, process.env.JWT_REFRESH_SECRET);

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
    const decoded = verifyRefreshToken(token);

    await Session.deleteOne({ _id: decoded.sessionId });
  }

  clearCookies(res);

  return res
    .status(200)
    .json({ status: 200, message: "Successfully logged out" });
});

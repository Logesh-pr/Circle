import express from "express";

//auth controllers
import {
  checkUsername,
  signup,
  resendOTP,
  verifyOTP,
  login,
  refresh,
  logout,
  checkOTPStatus,
  signupStatus,
} from "../controllers/auth.controller.js";

//validators
import {
  usernameValidation,
  signupValidation,
  loginValidation,
} from "../validator/auth.validation.js";

//custom middleware
import { verifyOTPToken } from "../middlewares/verify.js";
const router = express.Router();

router.post("/checkUsername", usernameValidation, checkUsername);
router.post("/signup", signupValidation, signup);
router.post("/signup/status", signupStatus);
// router.get("/otpStatus", verifyOTPToken, checkOTPStatus);
router.post("/resend-otp", verifyOTPToken, resendOTP);
router.post("/verify-otp", verifyOTPToken, verifyOTP);
router.post("/login", loginValidation, login);
router.post("/refresh", refresh);
router.post("/logout", logout);

export default router;

import express from "express";

//auth controllers
import {
  checkUsername,
  signup,
  resendOTP,
  verifyOTP,
} from "../controllers/auth.controller.js";

//validators
import {
  usernameValidation,
  signupValidation,
  resendOTPValidation,
  verifyOTPValidation,
} from "../validator/auth.validation.js";

const router = express.Router();

router.post("/checkUsername", usernameValidation, checkUsername);
router.post("/signup", signupValidation, signup);
router.post("/resend-otp", resendOTPValidation, resendOTP);
router.post("/verify-otp", verifyOTPValidation, verifyOTP);

export default router;

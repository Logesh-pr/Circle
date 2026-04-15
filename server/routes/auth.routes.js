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
  signupStatus,
  setUsername,
  fetchMe,
} from "../controllers/auth.controller.js";

//validators
import {
  usernameValidation,
  signupValidation,
  loginValidation,
} from "../validator/auth.validation.js";

//custom middleware
import {
  verify,
  verifyOTPToken,
  verifyUsernameToken,
} from "../middlewares/verify.js";
const router = express.Router();

router.post("/check-username", usernameValidation, checkUsername);
router.post("/signup", signupValidation, signup);
router.get("/signup/status", signupStatus);
router.post("/resend-otp", verifyOTPToken, resendOTP);
router.post("/verify-otp", verifyOTPToken, verifyOTP);
router.post("/set-username", verifyUsernameToken, setUsername);
router.post("/login", loginValidation, login);
router.get("/fetch-me", verify, fetchMe);
router.post("/refresh", refresh);
router.post("/logout", logout);

export default router;

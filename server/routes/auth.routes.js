import express from "express";

//auth controllers
import {
  checkUsername,
  signup,
  email,
} from "../controllers/auth.controller.js";

//validators
import {
  usernameValidation,
  signupValidation,
} from "../validator/auth.validation.js";

const router = express.Router();

router.post("/checkUsername", usernameValidation, checkUsername);
router.post("/signup", signupValidation, signup);
router.get("/email", email);

export default router;

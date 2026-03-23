import express from "express";

//auth controllers
import { checkUsername, email } from "../controllers/auth.controller.js";

//validators
import { usernameValidation } from "../validator/auth.validation.js";

const router = express.Router();

router.post("/checkUsername", usernameValidation, checkUsername);
router.get("/email", email);

export default router;

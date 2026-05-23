import express from "express";
import { verify } from "jsonwebtoken";
import { followUser } from "../controllers/user.controller";

const router = express.Router();

router.post("/follow/:username", verify, followUser);

export default router;

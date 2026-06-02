import express from "express";
import { verify } from "../middlewares/verify.js";
import {
  getUserProfile,
  followUser,
  searchUsers,
  getFollowsByUser,
} from "../controllers/user.controller.js";

const router = express.Router();

router.get("/get-user-profile/:username", verify, getUserProfile);
router.get("/search", verify, searchUsers);
router.post("/follow/:username", verify, followUser);
router.get("/profile/:username", verify);
router.get("/follows", verify, getFollowsByUser);
// router.get("/following/:username", verify);

export default router;

import express from "express";

//express validation
import {
  commentValidation,
  postValidation,
} from "../validator/post.validation.js";

//post controllers
import {
  bookmark,
  comment,
  createPost,
  like,
} from "../controllers/post.controller.js";

//middleware
import { verify } from "../middlewares/verify.js";
import upload from "../middlewares/upload.js";

const router = express.Router();

router.post(
  "/create-post",

  verify,
  upload.array("images", 4),
  createPost,
);
router.post("/like-post", like);
router.post("/comment-post", commentValidation, comment);
router.post("/bookmark-post", bookmark);

export default router;

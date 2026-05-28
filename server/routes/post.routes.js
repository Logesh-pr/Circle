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
  getAllBookmarks,
  getAllComments,
  getAllPost,
  getAllPostByProfile,
  like,
} from "../controllers/post.controller.js";

//middleware
import { verify } from "../middlewares/verify.js";
import upload from "../middlewares/upload.js";

const router = express.Router();

router.get("/all-post", verify, getAllPost);
router.get("/all-post-by-profile/:username", verify, getAllPostByProfile);
router.post(
  "/create-post",

  verify,
  upload.array("images", 4),
  createPost,
);
router.post("/like-post/:postId", verify, like);
router.post("/comment-post/:postId", verify, comment);
router.get("/all-comments/:postId", verify, getAllComments);
router.post("/bookmark-post/:postId", verify, bookmark);
router.get("/all-bookmarks", verify, getAllBookmarks);

export default router;

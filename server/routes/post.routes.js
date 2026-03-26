import express from "express";

//express validation
import { postValidation } from "../validator/post.validation.js";

//post controllers
import { createPost } from "../controllers/post.controller.js";

const router = express.Router();

router.post("/create-post", postValidation, createPost);

export default router;

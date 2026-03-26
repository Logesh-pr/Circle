import express from "express";

//auth routes
import authRoutes from "./auth.routes.js";
import postRoutes from "./post.routes.js";

const router = express.Router();

router.use("/auth", authRoutes);
router.use("/post", postRoutes);

export default router;

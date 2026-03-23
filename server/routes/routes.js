import express from "express";

//auth routes
import authRoutes from "./auth.routes.js";

const router = express.Router();

router.use("/auth", authRoutes);

export default router;

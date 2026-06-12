import express from "express";
import {
  getProfile,
  updateProfile,
} from "../controllers/userController.js";

import protect from "../middleware/authMiddleware.js";

const userRouter = express.Router();

// Get profile
userRouter.get("/profile", protect, getProfile);

// Update profile
userRouter.put("/profile", protect, updateProfile);

export default userRouter;
import express from "express"
import { signup, login, getMe } from "../controllers/authController.js";
import protect from "../middleware/authMiddleware.js";

const userRouter = express.Router();

userRouter.post("/signup", signup);
userRouter.post("/login", login);
userRouter.get("/me", protect, getMe)

export default userRouter;
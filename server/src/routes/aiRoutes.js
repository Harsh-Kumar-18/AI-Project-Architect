import express from "express";

import { generateProject } from "../controllers/aiController.js";

import protect from "../middleware/authMiddleware.js";

const aiRouter = express.Router();

aiRouter.post("/generate", protect, generateProject);

export default aiRouter;

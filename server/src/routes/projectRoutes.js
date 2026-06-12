import express from "express";
import protect from "../middleware/authMiddleware.js";

import {
  createProject,
  getProjects,
  getProjectById,
  deleteProject,
} from "../controllers/projectController.js";

const projectRouter = express.Router();

projectRouter.post("/generate", protect, createProject);

projectRouter.get("/", protect, getProjects);

projectRouter.get("/:id", protect, getProjectById);

projectRouter.delete("/:id", protect, deleteProject);

export default projectRouter;
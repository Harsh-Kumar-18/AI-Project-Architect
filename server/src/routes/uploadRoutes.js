import express from "express";
import upload from "../middleware/uploadMiddleware.js";
import { uploadImage } from "../controllers/uploadController.js";
import protect from "../middleware/authMiddleware.js";

const uploadRouter = express.Router();

uploadRouter.post(
  "/image",
  protect,
  upload.single("image"),
  uploadImage
);

export default uploadRouter;
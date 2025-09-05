import express from "express";
import upload from "../config/multer.js";
import { contactUs } from "../controllers/userController.js";

const router = express.Router();

// Contact us route
router.post("/contact", upload.single("file"), contactUs);

export default router;

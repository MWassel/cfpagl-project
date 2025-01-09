import express from "express";
import multer from "multer";
import path from "path";
import { requireAuth } from "../middleware/authMiddleware.js";

import { postIndex, patchIndex, getIndexById } from "./indexs.controller.js";
const router = express.Router();

// Multer configuration (for handling book index uploads)
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(process.cwd(), "/assets/book-indexs"));
  },
  filename: (req, file, cb) => {
    const uniqueName = `${Date.now()}-${file.originalname}`;
    cb(null, uniqueName);
  },
});

const upload = multer({ storage });

// post a indexs
router.post("/create-index", requireAuth, upload.single("index"), postIndex);
// patch a indexs
router.patch(
  "/patch-index/:index_id/:book_id",
  requireAuth,
  upload.single("index"),
  patchIndex
);
// get single indexs
router.get("/get-index/:book_id", getIndexById);

export default router;

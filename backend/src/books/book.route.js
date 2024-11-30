import express from "express";
import multer from "multer";
import path from "path";
import { requireAuth } from "../middleware/authMiddleware.js";

import {
  postBook,
  patchBook,
  deleteBook,
  getBook,
  getBookByID,
} from "./book.controller.js";

const router = express.Router();

// Multer configuration (for handling book cover uploads)
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(process.cwd(), "/assets/book-covers"));
  },
  filename: (req, file, cb) => {
    const uniqueName = `${Date.now()}-${file.originalname}`;
    cb(null, uniqueName);
  },
});

const upload = multer({ storage });

// post a book
router.post("/create-book", requireAuth, upload.single("cover"), postBook);

// patch a book
router.patch("/patch-book/", requireAuth, upload.single("cover"), patchBook);

// delete a book
router.delete("/delete-book/:book_id", requireAuth, deleteBook);

// get books
router.get("/", getBook);

// get single book
router.get("/get-book/:book_id", getBookByID);

export default router;

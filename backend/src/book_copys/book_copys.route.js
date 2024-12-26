import express from "express";
import {
  postBookCopy,
  patchBookCopy,
  deleteBookCopy,
  getBookCopys,
} from "./book_copys.controller.js";

const router = express.Router();

// post a book_copy
router.post("/create-book-copy", postBookCopy);
// patch a book_copy
router.patch("/patch-book-copy", patchBookCopy);
// deleted a book_copy
router.delete("/delete-book-copy/:copy_id", deleteBookCopy);
// get book_copys
router.get("/get-book_copy", getBookCopys);

export default router;

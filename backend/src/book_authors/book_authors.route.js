import express from "express";
import {
  getBookAuthors,
  patchBookAuthors,
  postBookAuthors,
  deleteBookAuthors,
} from "./book|_authors.controller.js";
const router = express.Router();

// post a book_authors
router.post("/create-book_authors", postBookAuthors);
// patch a book_authors
router.patch("/patch-book_authors/:book_id/:author_id", patchBookAuthors);
// get book_authors
router.get("/get-book_authors", getBookAuthors);
// delete a book_authors
router.delete("/delete-book_authors/:book_id/:author_id", deleteBookAuthors);

export default router;

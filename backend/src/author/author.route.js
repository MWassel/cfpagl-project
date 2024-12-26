import express from "express";
import { getAuthor, patchAuthor, postAuthor } from "./author.controller.js";

const router = express.Router();

// post a author
router.post("/create-author", postAuthor);
// patch a author
router.patch("/patch-author", patchAuthor);
// get authors
router.get("/", getAuthor);

export default router;

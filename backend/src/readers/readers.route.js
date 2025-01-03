import express from "express";
import { postReader, patchReader, getReader } from "./readers.controller.js";
const router = express.Router();

// post a reader
router.post("/create-reader", postReader);
// patch a reader
router.patch("/patch-reader/:read_session", patchReader);
// get readers
router.get("/", getReader);

export default router;

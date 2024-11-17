import express from "express";
import { getBranch, patchBranch, postBranch } from "./branch.controller.js";
const router = express.Router();

// Get a branch
router.get("/get-branch", getBranch);

// Post a branch
router.post("/create-branch", postBranch);

// Patch a branch
router.patch("/patch-branch", patchBranch);

export default router;

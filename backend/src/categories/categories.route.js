import express from "express";
import { requireAuth } from "../middleware/authMiddleware.js";
import {
  getCategories,
  postCategory,
  patchCategory,
  deleteCategory,
} from "./categories.controller.js";

const router = express.Router();

// post a categorie
router.post("/create-categorie", requireAuth, postCategory);
// patch a categorie
router.patch("/patch-categorie", requireAuth, patchCategory);
// deleted a categorie
router.delete("/delete-categorie", requireAuth, deleteCategory);
// get categories
router.get("/", getCategories);

export default router;

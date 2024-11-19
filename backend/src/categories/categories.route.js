import express from "express";
import {
  getCategories,
  postCategory,
  patchCategory,
  deleteCategory,
} from "./categories.controller.js";

const router = express.Router();

// post a categorie
router.post("/create-categorie", postCategory);
// patch a categorie
router.patch("/patch-categorie", patchCategory);
// deleted a categorie
router.delete("/delete-categorie", deleteCategory);
// get categories
router.get("/get-categorie", getCategories);

export default router;

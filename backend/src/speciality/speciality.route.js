import express from "express";
import {
  getSpeciality,
  patchSpeciality,
  postSpeciality,
} from "./speciality.controller.js";

const router = express.Router();

// Post a speciality
router.post("/create-speciality", postSpeciality);

// Get a speciality
router.get("/", getSpeciality);

// Patch a speciality
router.patch("/patch-speciality/:id", patchSpeciality);

export default router;

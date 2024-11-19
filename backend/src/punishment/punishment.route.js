import express from "express";
import {
  postPunishment,
  getPunishment,
  patchPunishment,
  deletePunishment,
} from "./punishment.controller.js";
const router = express.Router();

// post a punishment
router.post("/create-punishment", postPunishment);
// patch a punishment
router.patch("/patch-punishment", patchPunishment);
// get punishments
router.get("/get-punishment", getPunishment);
// delete a punishment
router.delete("/delete-punishment", deletePunishment);

export default router;

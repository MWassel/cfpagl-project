import express from "express";
import {
  postManager,
  patchManager,
  deleteManager,
  getManagers,
  getManagerById,
} from "./managers.controller.js";

const router = express.Router();

// post a manager
router.post("/create-manager", postManager);
// patch a manager
router.patch("/patch-manager/:manager_id", patchManager);
// deleted a manager
router.delete("/delete-manager/:manager_id", deleteManager);
// get managers
router.get("/get-manager", getManagers);
// get single manager
router.get("/get-manager/:manager_id", getManagerById);

export default router;

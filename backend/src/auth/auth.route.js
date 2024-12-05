import express from "express";
import { requireAuth } from "../middleware/authMiddleware.js";
import {
  loginManager,
  logoutManager,
  validateToken,
} from "./auth.controller.js";

const router = express.Router();

// login a manager
router.post("/login-manager", loginManager);
// logout a manager
router.get("/logout-manager", logoutManager);
// validate a manager
router.get("/validate", requireAuth, validateToken);

export default router;

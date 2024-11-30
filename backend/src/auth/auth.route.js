import express from "express";
import { loginManager, logoutManager } from "./auth.controller.js";

const router = express.Router();

// login a manager
router.post("/login-manager", loginManager);
// logout a manager
router.get("/logout-manager", logoutManager);

export default router;

import express from "express";
import { postLoan, patchLoan, getLoans } from "./loans.controller.js";

const router = express.Router();

// post a loan
router.post("/create-loan", postLoan);
// patch a loan
router.patch("/patch-loan/:loan_id", patchLoan);
// get loans
router.get("/get-loan", getLoans);

export default router;

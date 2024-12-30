import express from "express";
import {
  postLoan,
  patchLoan,
  getLoans,
  getAllLoans,
} from "./loans.controller.js";

const router = express.Router();

// post a loan
router.post("/create-loan", postLoan);
// patch a loan
router.patch("/patch-loan/:loan_id", patchLoan);
// get loans
router.get("/", getLoans);

router.get("/get-all-loans", getAllLoans);

export default router;

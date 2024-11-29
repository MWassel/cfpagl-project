import express from "express";
import {
  getPenaltyRecord,
  postPenaltyRecord,
  patchPenaltyRecord,
} from "./penalty_record.controller.js";

const router = express.Router();

// post a pemalty_record
router.post("/create-pemalty_record", postPenaltyRecord);
// patch a pemalty_record
router.patch("/patch-pemalty_record/:penalty_id", patchPenaltyRecord);
// get pemalty_records
router.get("/get-pemalty_record", getPenaltyRecord);

export default router;

import express from "express";
import {
  getPublishingHouse,
  postPublishingHouse,
  patchPublishingHouse,
  deletePublishingHouse,
} from "./publishing_house.controller.js";

const router = express.Router();

// post a publishing_house
router.post("/create-publishing_house", postPublishingHouse);
// patch a publishing_house
router.patch("/patch-publishing_house", patchPublishingHouse);
// get publishing_house
router.get("/get-publishing_house", getPublishingHouse);
// delete publishing_house
router.delete("/delete-publishing_house", deletePublishingHouse);

export default router;

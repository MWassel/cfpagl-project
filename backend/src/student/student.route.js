import express from "express";
import {
  postStudent,
  getStudent,
  getStudentByID,
  patchStudent,
} from "./student.controller.js";
const router = express.Router();

// post a student
router.post("/create-student", postStudent);
// patch a student
router.patch("/patch-student", patchStudent);
// get students
router.get("/get-student", getStudent);
// get single student
router.get("/get-student/:student_id", getStudentByID);

export default router;

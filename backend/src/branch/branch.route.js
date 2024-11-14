const express = require("express");
const router = express.Router();

// post a branch
router.post("/create-branch", async (req, res) => {
   // branch id input --varchar
   // training start date --date
   // training end date --date
   // speciality id --varchar --fk ref speciality
});
// patch a branch
router.patch("/patch-branch", async (req, res) => {
   // branch id input --varchar
   // training start date --date
   // training end date --date
   // speciality id --varchar --fk ref speciality
});

module.exports = router;
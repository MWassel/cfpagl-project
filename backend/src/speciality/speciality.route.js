const express = require("express");
const router = express.Router();

// post a speciality
router.post("/create-speciality", async (req, res) => {
    // speciality_id input (varchar)
    // speciality name input (varchar)
    // training_duration input (monthes int)
    // training_type (varchar)
});
// patch a speciality
router.patch("/patch-speciality", async (req, res) => {
    // speciality_id input (varchar)
    // speciality name input (varchar)
    // training_duration input (monthes int)
    // training_type (varchar)
});

module.exports = router;
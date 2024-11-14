const express = require("express");
const router = express.Router();

// post a pemalty_record
router.post("/create-pemalty_record", async (req, res) => {
    // loan_id int not null, FK
    // punishment_id int not null, FK
});
// patch a pemalty_record
router.patch("/patch-pemalty_record", async (req, res) => {
    // loan_id int not null, FK
    // punishment_id int not null, FK
});
// get pemalty_records
router.get("/get-pemalty_record", async (req, res) => {
   // loan_id int not null, FK
    // punishment_id int not null, FK
});

module.exports = router;
const express = require("express");
const router = express.Router();

// post a punishment
router.post("/create-punishment", async (req, res) => {
    // cause varchar(100) not null,
    // duration int not null --days
});
// patch a punishment
router.patch("/patch-punishment", async (req, res) => {
    // cause varchar(100) not null,
    // duration int not null --days
});
// get punishments
router.get("/get-punishment", async (req, res) => {
    // cause varchar(100) not null,
    // duration int not null --days
});

module.exports = router;
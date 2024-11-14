const express = require("express");
const router = express.Router();

// post a publishing_house
router.post("/create-publishing_house", async (req, res) => {
// publishing_house_name varchar(100) not null
});
// patch a publishing_house
router.patch("/patch-publishing_house", async (req, res) => {
   // publishing_house_name varchar(100) not null
});
// get publishing_house
router.get("/get-publishing_house", async (req, res) => {
    // publishing_house_name varchar(100) not null 
});

module.exports = router;
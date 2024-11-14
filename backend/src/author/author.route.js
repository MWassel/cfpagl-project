const express = require("express");
const router = express.Router();

// post a author
router.post("/create-author", async (req, res) => {
    // author_id int primary key auto_increment,
    // author_name varchar(60) not null, 
    // nationality varchar(30)
});
// patch a author
router.patch("/patch-author", async (req, res) => {
    // author_id int primary key auto_increment,
    // author_name varchar(60) not null, 
    // nationality varchar(30)
});
// get authors
router.get("/get-author", async (req, res) => {
    // author_id int primary key auto_increment,
    // author_name varchar(60) not null, 
    // nationality varchar(30)
});

module.exports = router;
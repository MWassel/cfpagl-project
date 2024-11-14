const express = require("express");
const router = express.Router();

// post a categorie
router.post("/create-categorie", async (req, res) => {
    // categorie_id int primary key auto_increment not null,
    // categorie_name varchar(50) not null 
});
// patch a categorie
router.patch("/patch-categorie", async (req, res) => {
    // categorie_id int primary key auto_increment not null,
    // categorie_name varchar(50) not null 
});
// deleted a categorie
router.delete("/delete-categorie", async (req, res) => {
    // categorie_id int primary key auto_increment not null,
    // categorie_name varchar(50) not null 
});
// get categories
router.get("/get-categorie", async (req, res) => {
    // categorie_id int primary key auto_increment not null,
    // categorie_name varchar(50) not null 
});

module.exports = router;
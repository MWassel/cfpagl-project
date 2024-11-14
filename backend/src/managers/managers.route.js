const express = require("express");
const router = express.Router();

// post a manager
router.post("/create-manager", async (req, res) => {
    // username varchar (25) not null,
    // passkey varchar (50) not null,
    // first_name varchar (25) not null,
    // last_name varchar (25) not null,
    // sex varchar(10) not null,
    // email varchar(50)
});
// patch a manager
router.patch("/patch-manager", async (req, res) => {
    // username varchar (25) not null,
    // passkey varchar (50) not null,
    // first_name varchar (25) not null,
    // last_name varchar (25) not null,
    // sex varchar(10) not null,
    // email varchar(50)
});
// deleted a manager
router.delete("/delete-manager", async (req, res) => {
    // username varchar (25) not null,
    // passkey varchar (50) not null,
    // first_name varchar (25) not null,
    // last_name varchar (25) not null,
    // sex varchar(10) not null,
    // email varchar(50)
});
// get managers
router.get("/get-manager", async (req, res) => {
    // username varchar (25) not null,
    // passkey varchar (50) not null,
    // first_name varchar (25) not null,
    // last_name varchar (25) not null,
    // sex varchar(10) not null,
    // email varchar(50)
});

module.exports = router;
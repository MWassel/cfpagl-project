const express = require("express");
const router = express.Router();

// post a reader
router.post("/create-reader", async (req, res) => {
    // exit_time timestamp, --ON EXIT
    // student_id int not null, FK
    // manager_id int not null, FK
    // copy_id varchar(25) not null, FK
});
// patch a reader
router.patch("/patch-reader", async (req, res) => {
    // exit_time timestamp, --ON EXIT
    // student_id int not null, FK
    // manager_id int not null, FK
    // copy_id varchar(25) not null, FK
});
// get readers
router.get("/get-reader", async (req, res) => {
    // exit_time timestamp, --ON EXIT
    // student_id int not null, FK
    // manager_id int not null, FK
    // copy_id varchar(25) not null, FK
});

module.exports = router;
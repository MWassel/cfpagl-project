const express = require("express");
const router = express.Router();

// post a loan
router.post("/create-loan", async (req, res) => {
    // loan_start_date timestamp default current_timestamp not null,
    // loan_end_date date --INTERED ON RETURN,
    // note varchar (50),
    // student_id int not null, FK
    // manager_id int not null,FK
    // copy_id varchar(25) not null, FK

});
// patch a loan
router.patch("/patch-loan", async (req, res) => {
    // loan_start_date timestamp default current_timestamp not null,
    // loan_end_date date --INTERED ON RETURN,
    // note varchar (50),
    // student_id int not null, FK
    // manager_id int not null,FK
    // copy_id varchar(25) not null, FK
});
// get loans
router.get("/get-loan", async (req, res) => {
    // loan_start_date timestamp default current_timestamp not null,
    // loan_end_date date --INTERED ON RETURN,
    // note varchar (50),
    // student_id int not null, FK
    // manager_id int not null,FK
    // copy_id varchar(25) not null, FK
});

module.exports = router;
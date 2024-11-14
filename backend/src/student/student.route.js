const express = require("express");
const router = express.Router();

// post a student
router.post("/create-student", async (req, res) => {
    // student_id int(10) primary key,
    // first_name varchar(25) not null,
    // last_name varchar(25) not null,
    // birth_date date not null,
    // phone_number varchar(15),
    // sex varchar(10) not null,
    // branch_id varchar(15), foreign key (branch_id) references Branch 
    // (branch_id) 
});
// patch a student
router.patch("/patch-student", async (req, res) => {
    // student_id int(10) primary key,
    // first_name varchar(25) not null,
    // last_name varchar(25) not null,
    // birth_date date not null,
    // phone_number varchar(15),
    // sex varchar(10) not null,
    // branch_id varchar(15), foreign key (branch_id) references Branch 
    // (branch_id) 
});
// deleted a student
router.delete("/delete-student", async (req, res) => {
    // student_id int(10) primary key,
    // first_name varchar(25) not null,
    // last_name varchar(25) not null,
    // birth_date date not null,
    // phone_number varchar(15),
    // sex varchar(10) not null,
    // branch_id varchar(15), foreign key (branch_id) references Branch 
    // (branch_id) 
});
// get students
router.get("/get-student", async (req, res) => {
    // student_id int(10) primary key,
    // first_name varchar(25) not null,
    // last_name varchar(25) not null,
    // birth_date date not null,
    // phone_number varchar(15),
    // sex varchar(10) not null,
    // branch_id varchar(15), foreign key (branch_id) references Branch 
    // (branch_id) 
});

module.exports = router;
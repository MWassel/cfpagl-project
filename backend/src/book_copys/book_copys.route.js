const express = require("express");
const router = express.Router();

// post a book_copy
router.post("/create-book_copy", async (req, res) => {
    // copy_id varchar(25) primary key not null,
    // inventory_number int not null,
    // location varchar(5),
    // book_id varchar(25) not null,
    // foreign key (book_id) references Books
    // (book_id)
});
// patch a book_copy
router.patch("/patch-book_copy", async (req, res) => {
    // copy_id varchar(25) primary key not null,
    // inventory_number int not null,
    // location varchar(5),
    // book_id varchar(25) not null,
    // foreign key (book_id) references Books
    // (book_id)
});
// deleted a book_copy
router.delete("/delete-book_copy", async (req, res) => {
    // copy_id varchar(25) primary key not null,
    // inventory_number int not null,
    // location varchar(5),
    // book_id varchar(25) not null,
    // foreign key (book_id) references Books
    // (book_id)
});
// get book_copys
router.get("/get-book_copy", async (req, res) => {
    // copy_id varchar(25) primary key not null,
    // inventory_number int not null,
    // location varchar(5),
    // book_id varchar(25) not null,
    // foreign key (book_id) references Books
    // (book_id)
});

module.exports = router;
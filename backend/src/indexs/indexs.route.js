const express = require("express");
const router = express.Router();

// post a indexs
router.post("/create-indexs", async (req, res) => {
    // index_id varchar(20) primary key not null,
    // index_picture varchar(250),
    // book_id varchar(25) not null,
    // foreign key (book_id) references Books
    // (book_id)
});
// patch a indexs
router.patch("/patch-indexs", async (req, res) => {
    // index_id varchar(20) primary key not null,
    // index_picture varchar(250),
    // book_id varchar(25) not null,
    // foreign key (book_id) references Books
    // (book_id)
});
// deleted a indexs
router.delete("/delete-indexs", async (req, res) => {
    // index_id varchar(20) primary key not null,
    // index_picture varchar(250),
    // book_id varchar(25) not null,
    // foreign key (book_id) references Books
    // (book_id)
});


module.exports = router;
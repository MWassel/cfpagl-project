const express = require("express");
const router = express.Router();

// post a book_authors
router.post("/create-book_authors", async (req, res) => {
    // author_id INT NOT NULL,
    // book_id VARCHAR(25) NOT NULL,
    // FOREIGN KEY (author_id) REFERENCES Author (author_id),
    // FOREIGN KEY (book_id) REFERENCES books (book_id),
    // PRIMARY KEY (author_id, book_id)
});
// patch a book_authors
router.patch("/patch-book_authors", async (req, res) => {
    // author_id INT NOT NULL,
    // book_id VARCHAR(25) NOT NULL,
    // FOREIGN KEY (author_id) REFERENCES Author (author_id),
    // FOREIGN KEY (book_id) REFERENCES books (book_id),
    // PRIMARY KEY (author_id, book_id)
});

module.exports = router;
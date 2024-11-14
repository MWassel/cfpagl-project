const express = require("express");
const router = express.Router();

// post a book
router.post("/create-book", async (req, res) => {
// book_id varchar(25) primary key not null,
// book_title varchar(200) not null,
// summary varchar(255),
// total_pages int,
// publishing_year int,
// stored_date timestamp default current_timestamp,
// cover varchar(250),
// categorie_id int not null,foreign key (categorie_id) references Categories 
// (categorie_id)
// publishing_house_id int not null,foreign key (publishing_house_id) references publishing_house 
// (publishing_house_id)
});

// patch a book
router.patch("/patch-book", async (req, res) => {
    // book_id varchar(25) primary key not null,
    // book_title varchar(200) not null,
    // summary varchar(255),
    // total_pages int,
    // publishing_year int,
    // stored_date timestamp default current_timestamp,
    // cover varchar(250),
    // categorie_id int not null,foreign key (categorie_id) references Categories 
    // (categorie_id)
    // publishing_house_id int not null,foreign key (publishing_house_id) references publishing_house 
    // (publishing_house_id)
    });

    // delete a book
router.delete("/delete-book", async (req, res) => {
    // book_id varchar(25) primary key not null,
    // book_title varchar(200) not null,
    // summary varchar(255),
    // total_pages int,
    // publishing_year int,
    // stored_date timestamp default current_timestamp,
    // cover varchar(250),
    // categorie_id int not null,foreign key (categorie_id) references Categories 
    // (categorie_id)
    // publishing_house_id int not null,foreign key (publishing_house_id) references publishing_house 
    // (publishing_house_id)
    });

        // delete a book
router.get("/get-book", async (req, res) => {
    // book_id varchar(25) primary key not null,
    // book_title varchar(200) not null,
    // summary varchar(255),
    // total_pages int,
    // publishing_year int,
    // stored_date timestamp default current_timestamp,
    // cover varchar(250),
    // categorie_id int not null,foreign key (categorie_id) references Categories 
    // (categorie_id)
    // publishing_house_id int not null,foreign key (publishing_house_id) references publishing_house 
    // (publishing_house_id)
    });
module.exports = router;

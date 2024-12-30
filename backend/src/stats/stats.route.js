import express from "express";
import prismaClient from "../lib/prismaClient.js";

const router = express.Router();

router.get("/total-books", (req, res) => {
  prismaClient.books
    .count({
      where: {
        deleted: false,
      },
    })
    .then((count) => {
      res.status(200).json(count);
    })
    .catch((err) => {
      console.log(err);
    });
});

router.get("/total-copies", (req, res) => {
  prismaClient.book_copys
    .count()
    .then((count) => {
      res.status(200).json(count);
    })
    .catch((err) => {
      console.log(err);
    });
});

router.get("/total-loans", (req, res) => {
  prismaClient.loans
    .count()
    .then((count) => {
      res.status(200).json(count);
    })
    .catch((err) => {
      console.log(err);
    });
});

router.get("/total-students", (req, res) => {
  prismaClient.student
    .count()
    .then((count) => {
      res.status(200).json(count);
    })
    .catch((err) => {
      console.log(err);
    });
});

router.get("/total-unreturned-loans", (req, res) => {
  prismaClient.loans
    .count({
      where: {
        loan_end_date: null,
      },
    })
    .then((count) => {
      res.status(200).json(count);
    })
    .catch((err) => {
      console.log(err);
    });
});

router.get("/total-penalties-applied", (req, res) => {
  prismaClient.penalty_record
    .count()
    .then((count) => {
      res.status(200).json(count);
    })
    .catch((err) => {
      console.log(err);
    });
});

export default router;

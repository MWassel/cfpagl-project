import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import { requireAuth, checkUser } from "./src/middleware/authMiddleware.js";
import specialityRoutes from "./src/speciality/speciality.route.js";
import branchRoutes from "./src/branch/branch.route.js";
import studentRoutes from "./src/student/student.route.js";
import authorRoutes from "./src/author/author.route.js";
import categoriesRoutes from "./src/categories/categories.route.js";
import publishingRoutes from "./src/publishing_house/publishing_house.route.js";
import punishmentRoutes from "./src/punishment/punishment.route.js";
import bookRoutes from "./src/books/book.route.js";
import bookCopysRoutes from "./src/book_copys/book_copys.route.js";
import bookAuthorsRoutes from "./src/book_authors/book_authors.route.js";
import bookIndexRoutes from "./src/indexs/indexs.route.js";
import managersRoutes from "./src/managers/managers.route.js";
import loansRoutes from "./src/loans/loans.route.js";
import readersRoutes from "./src/readers/readers.route.js";
import penaltyRecordRoutes from "./src/penalty_record/penalty_record.route.js";

const app = express();
const port = process.env.PORT || 8080;

// Middleware
//app.use(checkUser);
app.use(cookieParser());
app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

app.get("*", checkUser);

// Routes
app.use("/api/speciality", requireAuth, specialityRoutes);
app.use("/api/branch", requireAuth, branchRoutes);
app.use("/api/student", requireAuth, studentRoutes);
app.use("/api/author", requireAuth, authorRoutes);
app.use("/api/categories", categoriesRoutes);
app.use("/api/publishing", requireAuth, publishingRoutes);
app.use("/api/punishment", requireAuth, punishmentRoutes);
app.use("/api/book", bookRoutes);
app.use("/api/book_copys", requireAuth, bookCopysRoutes);
app.use("/api/book_authors", requireAuth, bookAuthorsRoutes);
app.use("/api/book_index", bookIndexRoutes);
app.use("/api/managers", managersRoutes);
app.use("/api/loans", requireAuth, loansRoutes);
app.use("/api/readers", requireAuth, readersRoutes);
app.use("/api/penalty_record", requireAuth, penaltyRecordRoutes);

// Health check
app.get("/", (req, res) => {
  res.send("CFPAGL SERVER RUNNING!");
});

app.listen(port, () => {
  console.log(`CFPAGL SERVER listening on port ${port}`);
});

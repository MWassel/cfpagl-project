import express from "express";
import cors from "cors";
import specialityRoutes from "./src/speciality/speciality.route.js";
import branchRoutes from "./src/branch/branch.route.js";
import studentRoutes from "./src/student/student.route.js";
import authorRoutes from "./src/author/author.route.js";
import categoriesRoutes from "./src/categories/categories.route.js";
import publishingRoutes from "./src/publishing_house/publishing_house.route.js";
import punishmentRoutes from "./src/punishment/punishment.route.js";
import bookRoutes from "./src/books/book.route.js";

const app = express();
const port = process.env.PORT || 8080;

// Middleware
app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

// Routes
app.use("/api/speciality", specialityRoutes);
app.use("/api/branch", branchRoutes);
app.use("/api/student", studentRoutes);
app.use("/api/author", authorRoutes);
app.use("/api/categories", categoriesRoutes);
app.use("/api/publishing", publishingRoutes);
app.use("/api/punishment", punishmentRoutes);
app.use("/api/book", bookRoutes);

app.get("/", (req, res) => {
  res.send("CFPAGL SERVER RUNNING!");
});

app.listen(port, () => {
  console.log(`CFPAGL SERVER listening on port ${port}`);
});

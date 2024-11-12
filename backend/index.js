const express = require("express");
const cors = require("cors");

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

// routes
const bookRoutes = require("./src/books/book.route");
app.use("/api/books", bookRoutes);

app.get("/", (req, res) => {
  res.send("CFPAGL SERVER RUNNING!");
});

app.listen(port, () => {
  console.log(`CFPAGL SERVER listening on port ${port}`);
});

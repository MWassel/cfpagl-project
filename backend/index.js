const express = require("express");
const app = express();
const port = process.env.PORT || 8080;

app.get("/", (req, res) => {
  res.send("CFPAGL SERVER RUNNING!");
});

app.listen(port, () => {
  console.log(`CFPAGL SERVER listening on port ${port}`);
});

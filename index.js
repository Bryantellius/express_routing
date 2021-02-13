const express = require("express");
const path = require("path");

const dataPath = path.join(__dirname, "./index.html");

const app = express();

app.get("/", (req, res) => {
  try {
    res.status(200).sendFile(dataPath);
  } catch (error) {
    res.status(500).json({ error: "An error occurred on the server" });
  }
});

app.listen(3000, () => console.log("Server listening on port 3000..."));


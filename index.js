const express = require("express");
const path = require("path");
const fs = require("fs");

const dataPath = path.join(__dirname, "./index.html");

const app = express();

app.use(express.json());

app.get("/pokemon", (req, res) => {
  try {
    res.status(200).sendFile(dataPath);
  } catch (error) {
    res.status(500).json({ error: "An error occurred on the server" });
  }
});

app.put("/pokemon/:id", (req, res, next) => {
  try {
    let { id } = req.params;
    let { body } = req.body;

    fs.readFile(dataPath, (err, data) => {
      if (err) {
        next(err);
      }
      data.map((pokemon) => {
        if (pokemon.id === id) {
          console.log("FOUND!");
        }
      });
    });

    res.status(200).json({ msg: "Pokemon Updated!" });
  } catch (error) {
    res.status(500).json({ error: "An error occurred on the server" });
  }
});

app.post("/pokemon", (req, res) => {
  try {
    let { body } = req;
    res.status(200).json({ msg: "Pokemon Added!" });
  } catch (error) {
    res.status(500).json({ error: "An error occurred on the server" });
  }
});

app.get("*", (req, res) => {
  try {
    res.status(404).send("404 Not Found");
  } catch (error) {
    res.status(500).json({ error: "An error occurred on the server" });
  }
});

app.use((err, req, res, next) => {
  res.status(err.status || 500);
  res.json({ errors: { err: err.message } });
});

app.listen(process.env.PORT || 3000, () => console.log("Server listening..."));

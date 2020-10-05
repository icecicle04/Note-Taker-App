const express = require("express");
const fs = require("fs");
const { stringify } = require("querystring");
const app = express();
const path = require("path");

const PORT = process.env.PORT || 8080;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));

app.get("/", function (req, res) {
  res.sendFile(path.join(__dirname, "../assets/index.html"));
});

app.get("/notes", function (req, res) {
  res.sendFile(path.join(__dirname, "../assets/notes.html"));
});

app.get("/api/notes", (req, res) => {
  fs.readFile("/db.json", "utf-8", (err, data) => {
    if (err) {
      console.log(err);
      return res.status(500).json({
        error: true,
        data: null,
        message: "Unable to retrieve notes.",
      });
    }
    res.json({
      error: false,
      data: JSON.parse(data),
      message: "Successfully retrieved notes.",
    });
  });
});

app.post("/api/notes", (req, res) => {
  console.log(req.body);
  fs.readFile("/db.json", "utf-8", (err, data) => {
    if (err) {
      console.log(err);
      return res.status(500).json({
        error: true,
        data: null,
        message: "Unable to add note.",
      });
    }
    console.log(data);
    const updatedData = JSON.parse(data);
    updatedData.push(req.body);
    console.log(updatedData);
    fs.writeFile("/db.json", JSON.stringify(updatedData), (err) => {
      if (err)
        if (err) {
          console.log(err);
          return res.status(500).json({
            error: true,
            data: null,
            message: "Unable to add note.",
          });
        }
      res.json({
        error: false,
        data: updatedData,
        message: "Successfully added new note.",
      });
    });
  });
});

app.listen(PORT, () => {
  console.log(`App is running on http://localhost:${PORT}`);
});

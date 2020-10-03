const express = require("express");
const fs = require("fs");
const { stringify } = require("querystring");
const app = express();

const PORT = process.env.PORT || 8080;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.post("/api/notes", (req, res) => {
  console.log(req.body);
  fs.readFile("./db.json", "utf-8", (err, data) => {
    if (err) throw err;
    console.log(data);
    const updatedData = JSON.parse(data);
    updatedData.push(req.body);
    console.log(updatedData);
    fs.writeFile("./db.json", JSON.stringify(updatedData), (err) => {
      if (err) throw err;
    });
  });
});

app.listen(PORT, () => {
  console.log(`App is running on http://localhost:${PORT}`);
});

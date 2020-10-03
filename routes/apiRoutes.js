// load data

const notes = require("../js/index");

// routing

module.exports = function (app) {
  //api get requests
  app.get("/api/notes", function (req, res) {
    res.json(notes);
  });
};

// api post requests

app.post("/api/notes", function (req, res) {
  notes.push(req.body);
});

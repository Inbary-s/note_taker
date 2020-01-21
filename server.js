const PORT = 8000;
const express = require("express");
const fs = require("fs");
const path = require("path");
let app = express();

let data = JSON.parse(fs.readFileSync("./Develop/db/db.json", "utf8"));
console.log(data);

app.use(express.urlencoded({extended: true}));

app.use(express.json());
app.use(express.static("./Develop/public"));

app.get("/", function(req, res) {
  res.sendFile(path.join(__dirname, "./Develop/public/index.html"));
});
app.get("/notes", function(req, res) {
  res.sendFile(path.join(__dirname, "./Develop/public/notes.html"));
});

app.post("/api/notes", function(req, res) {
  data.push(req.body);
  console.log(data);
  fs.writeFile("./Develop/db/db.json", JSON.stringify(data), err =>
    console.log(err)
  );
});

app.listen(PORT, function() {
  console.log("Server is listening here: ", PORT);
});

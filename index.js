const express = require("express");
const app = express();

const cors = require('cors');
app.use(cors({ optionsSuccessStatus: 200 }));

app.use(express.static("./public"));
// app.use(express.json());

app.get("/", (req, res) => {
  return res.status(200)
    .sendFile(__dirname + "/views/index.html");
});

app.get("/api/:date?", (req, res) => {
  if (!req.params.date) {
    return res.status(200)
      .json({
        unix: Date.now(),
        utc: new Date(Date.now()).toUTCString()
      });
  };

  let d = new Date(req.params.date);

  if (d.toString() !== "Invalid Date") {
    return res.status(200).
      json({
        unix: Date.parse(d),
        utc: d.toUTCString()
      });
  };

  if (Number(req.params.date)) {
    d = Number(req.params.date);
    return res.status(200)
      .json({
        unix: d,
        utc: new Date(d).toUTCString()
      })
  };

  return res.status(400)
    .json({
      error: "Invalid Date"
    });
});

//not found
app.get("*", (req, res) => {
  return res.status(404)
    .json({ msg: "Page not found." });
});

app.listen(5432, () => {
  console.log("Server listening on port 5432.");
});

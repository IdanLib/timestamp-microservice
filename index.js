// init project
const express = require("express");
const app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
const cors = require('cors');
app.use(cors({ optionsSuccessStatus: 200 }));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static("./public"));
// app.use(express.json());

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", (req, res) => {
  return res.status(200)
    .sendFile(__dirname + "/views/index.html");
});

// your first API endpoint...
app.get("/api/hello", (req, res) => {
  return res.status(200)
    .json({ msg: "Hello there!" });
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

  // console.log("invalid param");
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


// listen for requests :)
app.listen(5432, () => {
  console.log("Server listening on port 5432.");
});

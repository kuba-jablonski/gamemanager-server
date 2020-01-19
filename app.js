const express = require("express");

const app = express();

app.use(express.json());

app.get("/test", (req, res) => {
  res.json({ msg: "Hello world!" });
});

module.exports = app;

const express = require("express");
const gameRouter = require("./routes/gameRoutes");

const app = express();

app.use(express.json());

app.use("/api/v1/games", gameRouter);

module.exports = app;

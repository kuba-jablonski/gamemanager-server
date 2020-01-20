const express = require("express");
const cors = require("cors");
const gameRouter = require("./routes/gameRoutes");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/v1/games", gameRouter);

module.exports = app;

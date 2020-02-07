const express = require("express");
const cors = require("cors");
const gameRouter = require("./routes/gameRoutes");
const userRouter = require("./routes/userRoutes");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/v1/games", gameRouter);
app.use("/api/v1/users", userRouter);

module.exports = app;

const express = require("express");
const cors = require("cors");
const compression = require("compression");
const AppError = require("./utils/appError");
const globalErrorHandler = require("./controllers/errorController");
const userRouter = require("./routes/userRoutes");
const gameRouter = require("./routes/gameRoutes");

const app = express();

// app.use(cors());
// app.options("*", cors());
app.all("*", cors({ allowedHeaders: ["Content-Type", "Authorization"] }));
app.use(express.json());
app.use(compression());

app.use("/api/v1/users", userRouter);
app.use("/api/v1/games", gameRouter);

app.all("*", (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});

app.use(globalErrorHandler);

module.exports = app;

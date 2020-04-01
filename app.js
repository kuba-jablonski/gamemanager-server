const express = require("express");
const cors = require("cors");
const rateLimit = require("express-rate-limit");
const helmet = require("helmet");
const mongoSanitize = require("express-mongo-sanitize");
const xss = require("xss-clean");
const compression = require("compression");
const AppError = require("./utils/appError");
const globalErrorHandler = require("./controllers/errorController");
const userRouter = require("./routes/userRoutes");
const gameRouter = require("./routes/gameRoutes");

const app = express();

app.use(helmet());
const limiter = rateLimit({
  max: 500,
  windowMs: 60 * 60 * 1000,
  message: "Too many requests from this IP, please try again in an hour!"
});
app.use(limiter);
app.use(cors());
app.options("*", cors());
// app.all("*", cors({ allowedHeaders: ["Content-Type", "Authorization"] }));
app.use(express.json({ limit: "10kb" }));
app.use(mongoSanitize());
app.use(xss());
app.use(compression());

app.use("/api/v1/users", userRouter);
app.use("/api/v1/games", gameRouter);

app.all("*", (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});

app.use(globalErrorHandler);

module.exports = app;

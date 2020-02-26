const express = require("express");
const backlogController = require("../controllers/backlogController");
const authController = require("../controllers/authController");
const gameRouter = require("./gameRoutes");

const router = express.Router();

router.use("/me/games", gameRouter);

router
  .route("/me")
  .get(authController.protect, backlogController.getMyBacklog)
  .post(authController.protect, backlogController.createMyBacklog);
// .post(authController.protect, backlogController.createGame);

module.exports = router;

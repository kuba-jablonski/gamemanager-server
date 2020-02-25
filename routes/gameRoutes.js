const express = require("express");
const gameController = require("../controllers/gameController");
const authController = require("../controllers/authController");

const router = express.Router();

router
  .route("/")
  .get(gameController.getAllGames)
  .post(authController.protect, gameController.createGame);

module.exports = router;

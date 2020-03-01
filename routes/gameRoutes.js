const express = require("express");
const gameController = require("../controllers/gameController");
const authController = require("../controllers/authController");

const router = express.Router();

router.use(authController.protect);

router
  .route("/")
  .get(gameController.getGames)
  .post(gameController.createGame);

router
  .route("/:gameId")
  .patch(gameController.updateGame)
  .delete(gameController.deleteGame);

module.exports = router;

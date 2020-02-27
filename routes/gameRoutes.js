const express = require("express");
const gameController = require("../controllers/gameController");
const authController = require("../controllers/authController");

const router = express.Router();

router
  .route("/")
  .get(gameController.getAllGames)
  .post(authController.protect, gameController.createGame);

router
  .route("/:gameId")
  .patch(authController.protect, gameController.updateGame)
  .delete(authController.protect, gameController.deleteGame);

// router.route("/").post(authController.protect, gameController.createGame);
// router
//   .route("/:gameId")
//   .patch(authController.protect, gameController.updateGame)
//   .delete(authController.protect, gameController.daleteGame);

module.exports = router;

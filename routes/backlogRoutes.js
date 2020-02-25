const express = require("express");
const backlogController = require("../controllers/backlogController");
const authController = require("../controllers/authController");

const router = express.Router();

router
  .route("/me")
  .get(authController.protect, backlogController.getMyBacklog)
  .update();
// .post(authController.protect, backlogController.createGame);

module.exports = router;

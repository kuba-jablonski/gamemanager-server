const express = require("express");
const userController = require("../controllers/userController");
const authController = require("../controllers/authController");

const router = express.Router();

router.post("/signup", authController.signup);
router.post("/login", authController.login);
router.patch(
  "/updateMyPassword",
  authController.protect,
  authController.updatePassword
);

router.route("/").get(userController.getAllUsers);
router
  .route("/me")
  .get(authController.protect, userController.getMe)
  .patch(authController.protect, userController.updateMe);

module.exports = router;

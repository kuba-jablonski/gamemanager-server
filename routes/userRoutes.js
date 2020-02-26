const express = require("express");
const userController = require("../controllers/userController");
const authController = require("../controllers/authController");
// const backlogController = require("../controllers/backlogController");

const router = express.Router();

router.post("/signup", authController.signup);
router.post("/login", authController.login);

router.route("/").get(userController.getAllUsers);
// router
//   .route("/me/backlog")
//   .get(authController.protect, backlogController.getMyBacklog)
//   .post(authController.protect, backlogController.createMyBacklog)
//   .patch(authController.protect, backlogController.addToMyBacklog);
// .post(userController.createUser);

// router
//   .route('/:id')
//   .get(userController.getUser)
//   .patch(userController.updateUser)
//   .delete(userController.deleteUser);

module.exports = router;

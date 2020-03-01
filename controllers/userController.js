const User = require("../models/userModel");
const catchAsync = require("../utils/catchAsync");
// const AppError = require("../utils/appError");

exports.getAllUsers = catchAsync(async (req, res) => {
  const users = await User.find().populate("games");

  // SEND RESPONSE
  res.status(200).json({ users });
});

exports.getMe = catchAsync(async (req, res, next) => {
  const user = await User.findById(req.user.id).populate("games");

  res.status(200).json({ user });
});

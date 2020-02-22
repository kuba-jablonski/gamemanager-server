const User = require("../models/userModel");
const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/appError");

exports.getAllUsers = catchAsync(async (req, res) => {
  const users = await User.find();

  // SEND RESPONSE
  res.status(200).json({ users });
});

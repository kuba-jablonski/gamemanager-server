const pick = require("lodash/pick");
const User = require("../models/userModel");
const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/appError");

exports.getAllUsers = catchAsync(async (req, res) => {
  const users = await User.find().populate("games");

  res.status(200).json({ users });
});

exports.getMe = catchAsync(async (req, res, next) => {
  const user = await User.findById(req.user.id).populate("games");

  res.status(200).json({ user });
});

exports.updateMe = catchAsync(async (req, res, next) => {
  if (req.body.password || req.body.passwordConfirm) {
    return next(
      new AppError(
        "This route is not for password updates. Please use /updateMyPassword",
        400
      )
    );
  }

  const updatedUser = await User.findByIdAndUpdate(
    req.user.id,
    pick(req.body, "username", "email"),
    {
      new: true,
      runValidators: true
    }
  );

  res.status(200).json({ user: updatedUser });
});

const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/appError");
const Backlog = require("../models/backlogModel");

exports.createMyBacklog = catchAsync(async (req, res, next) => {
  const backlog = await Backlog.create({ owner: req.user._id });

  res.status(201).json({ backlog });
});

exports.getMyBacklog = catchAsync(async (req, res, next) => {
  const backlog = await Backlog.findOne({ owner: req.user._id });

  res.status(200).json({ backlog });
});

exports.addToMyBacklog = catchAsync(async (req, res, next) => {
  const backlog = await Backlog.findOneAndUpdate(
    { owner: req.user._id, "items.apiId": { $ne: req.body.apiId } },
    { $push: { items: req.body } },
    { new: true }
  );

  if (!backlog) return next(new AppError("You already added this game.", 400));

  res.status(200).json({ backlog });
});

// exports.removeFromMyBacklog = catchAsync(async (req,res,next) => {
//   const backlog = Backlog.findOneAndUpdate({ owner: req.user._id }, {items: {$pull: req.}})
// })

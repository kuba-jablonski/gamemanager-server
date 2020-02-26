const catchAsync = require("../utils/catchAsync");
const Backlog = require("../models/backlogModel");
const AppError = require("../utils/appError");

exports.createGame = catchAsync(async (req, res, next) => {
  const backlog = await Backlog.findOneAndUpdate(
    { owner: req.user._id, "items.apiId": { $ne: req.body.apiId } },
    { $push: { items: req.body } },
    { new: true, runValidators: true }
  );

  if (!backlog) return next(new AppError("You already added this game.", 400));

  res.status(200).json({ backlog });
});

exports.updateGame = catchAsync(async (req, res, next) => {
  const backlog = await Backlog.findOneAndUpdate(
    {
      owner: req.user._id,
      "items._id": req.params.gameId
    },
    {
      $set: {
        "items.$.logType": req.body.logType
      }
    },
    {
      new: true,
      runValidators: true
    }
  );

  if (!backlog)
    return next(new AppError("No game with this ID waws found.", 404));

  res.status(200).json({ backlog });
});

exports.daleteGame = catchAsync(async (req, res, next) => {
  const backlog = await Backlog.findOneAndUpdate(
    {
      owner: req.user._id,
      "items._id": req.params.gameId
    },
    {
      $pull: {
        items: {
          _id: req.params.gameId
        }
      }
    },
    {
      new: true,
      runValidators: true
    }
  );

  if (!backlog)
    return next(new AppError("No game with this ID was found.", 404));

  res.status(200).json({ backlog });
});

const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/appError");
const Game = require("../models/gameModel");

exports.createGame = catchAsync(async (req, res, next) => {
  const game = await Game.findOneAndUpdate(
    { apiId: req.body.apiId, "holders.user": { $ne: req.user.id } },
    {
      name: req.body.name,
      apiId: req.body.apiId,
      $push: { holders: { user: req.user.id, logType: req.body.logType } }
    },
    {
      new: true,
      upsert: true,
      runValidators: true
    }
  );

  res.status(201).json({ game });
});

exports.getAllGames = catchAsync(async (req, res, next) => {
  const games = await Game.find({ "holders.user": req.user.id });

  res.status(200).json({ games });
});

exports.updateGame = catchAsync(async (req, res, next) => {
  const game = await Game.findOneAndUpdate(
    { _id: req.params.gameId, "holders.user": req.user.id },
    {
      $set: {
        "holders.$.logType": req.body.logType
      }
    },
    { new: true, runValidators: true }
  );

  if (!game) return next(new AppError("Game not found", 404));

  res.status(200).json({ game });
});

exports.deleteGame = catchAsync(async (req, res, next) => {
  const game = await Game.findOneAndUpdate(
    { _id: req.params.gameId, "holders.user": req.user.id },
    {
      $pull: {
        holders: {
          user: req.user.id
        }
      }
    },
    { new: true, runValidators: true }
  );

  if (!game) return next(new AppError("Game not found", 404));

  res.status(204).json({ game: null });
});

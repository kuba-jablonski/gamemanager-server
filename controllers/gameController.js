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

// exports.setUserIds = (req, res, next) => {
//   if (!req.body.user) req.body.user = req.user.id;
//   next();
// };

exports.getAllGames = catchAsync(async (req, res, next) => {
  const filter = {};

  const games = await Game.find(filter);

  res.status(200).json({ games });
});

exports.updateGame = catchAsync(async (req, res, next) => {
  const game = await Game.findOneAndUpdate(
    { _id: req.params.gameId, "holders.user": req.body.user },
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
    { _id: req.params.gameId, "holders.user": req.body.user },
    {
      $pull: {
        holders: {
          user: req.body.user
        }
      }
    },
    { new: true, runValidators: true }
  );

  if (!game) return next(new AppError("Game not found", 404));

  res.status(204).json({ game: null });
});

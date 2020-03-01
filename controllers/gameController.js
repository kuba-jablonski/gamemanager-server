const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/appError");
const Game = require("../models/gameModel");

exports.createGame = catchAsync(async (req, res, next) => {
  const game = await Game.create(req.body);

  res.status(201).json({ game });
});

exports.getGames = catchAsync(async (req, res, next) => {
  const games = await Game.find();

  res.status(200).json({ games });
});

exports.updateGame = catchAsync(async (req, res, next) => {
  const game = await Game.findByIdAndUpdate(req.params.gameId, req.body, {
    new: true,
    runValidators: true
  });

  if (!game) return next(new AppError("Game not found", 404));

  res.status(200).json({ game });
});

exports.deleteGame = catchAsync(async (req, res, next) => {
  const game = await Game.findByIdAndRemove(req.params.gameId);

  if (!game) return next(new AppError("Game not found", 404));

  res.status(204).json({ game: null });
});

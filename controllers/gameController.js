const catchAsync = require("../utils/catchAsync");
const Game = require("../models/gameModel");

exports.getAllGames = catchAsync(async (req, res, next) => {
  const games = await Game.find();

  res.status(200).json(games);
});

exports.createGame = catchAsync(async (req, res, next) => {
  const game = await Game.create(req.body);
  res.status(201).json(game);
});

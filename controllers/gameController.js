const Game = require("../models/gameModel");

exports.getAllGames = async (req, res) => {
  try {
    const games = await Game.find();

    res.status(200).json(games);
  } catch (e) {
    res.status(404).json(e);
  }
};

exports.createGame = async (req, res) => {
  try {
    const game = await Game.create(req.body);
    res.status(201).json(game);
  } catch (e) {
    res.status(400).json(e);
  }
};

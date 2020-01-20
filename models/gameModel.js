const mongoose = require("mongoose");

const gameSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  apiId: {
    type: Number,
    required: true,
    unique: true
  },
  logType: {
    type: String,
    required: true,
    enum: ["active", "backlog", "wishlist", "completed"]
  }
});

const Game = mongoose.model("Game", gameSchema);

module.exports = Game;

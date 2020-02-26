const mongoose = require("mongoose");

const holderSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    unique: true,
    required: true
  },
  logType: {
    type: String,
    required: true,
    enum: ["active", "backlog", "wishlist", "completed"]
  }
});

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
  holders: [holderSchema]
});

const Game = mongoose.model("Game", gameSchema);

module.exports = Game;

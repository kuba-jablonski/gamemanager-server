const mongoose = require("mongoose");

const gameSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, "Game must have a title."]
  },
  apiId: {
    type: Number,
    required: [true, "Game must have an API ID."]
  },
  user: {
    type: mongoose.Schema.ObjectId,
    required: [true, "Game must belong to a user."]
  }
});

gameSchema.index({ apiId: 1, user: 1 }, { unique: true });

const Game = mongoose.model("Game", gameSchema);

module.exports = Game;

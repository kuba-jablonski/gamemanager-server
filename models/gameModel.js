const mongoose = require("mongoose");

const gameSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  apiId: {
    type: Number,
    unique: true,
    required: true
  },
  holders: [
    {
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
    }
  ]
});

const Game = mongoose.model("Game", gameSchema);

module.exports = Game;

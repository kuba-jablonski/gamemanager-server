const mongoose = require("mongoose");
const AppError = require("../utils/appError");

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
  },
  status: {
    type: String,
    required: [true, "Game must have a status."],
    enum: {
      values: ["active", "wishlist", "backlog", "completed"],
      message: "Status is either: active, wishlist, backlog, or completed."
    }
  }
});

gameSchema.index({ apiId: 1, user: 1 }, { unique: true });

gameSchema.post("save", function(error, doc, next) {
  if (error.name === "MongoError" && error.code === 11000) {
    next(new AppError("Game already in log.", 400));
  } else {
    next(error);
  }
});

const Game = mongoose.model("Game", gameSchema);

module.exports = Game;

const mongoose = require("mongoose");

const backlogSchema = new mongoose.Schema({
  owner: {
    type: mongoose.Schema.ObjectId,
    required: [true, "Backlog must belong to a user"]
  },
  items: [
    {
      name: {
        type: String,
        required: true
      },
      apiId: {
        type: Number,
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

const Backlog = mongoose.model("Backlog", backlogSchema);

module.exports = Backlog;

const User = require("../models/userModel");

exports.getAllUsers = async (req, res) => {
  const users = await User.find();

  // SEND RESPONSE
  res.status(200).json(users);
};

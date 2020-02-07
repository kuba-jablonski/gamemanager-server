const jwt = require("jsonwebtoken");
const User = require("../models/userModel");

const signToken = id => {
  return jwt.sign(
    {
      id
    },
    process.env.JWT_SECRET,
    {
      expiresIn: process.env.JWT_EXPIRES_IN
    }
  );
};

exports.signup = async (req, res) => {
  const newUser = await User.create(req.body);

  const token = signToken(newUser._id);

  res.status(201).json({ token, user: newUser });
};

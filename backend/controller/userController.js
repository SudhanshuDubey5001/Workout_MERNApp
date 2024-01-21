const mongoose = require("mongoose");
const User = require("../modals/userModel");
//JWT token
const jwt = require("jsonwebtoken");

const generateToken = (_id) => {
  return jwt.sign(
    { _id }, //payload you want to use (no senstive data allowed)
    process.env.SECRET, // a secret random string, complicated the better
    { expiresIn: "3d" } //expire the token in 3 days once authenticated
  );
};

//login logic
const user_login = async (req, res) => {
  const { email, password } = req.body;
  try {
    console.log("loggin in....");
    const user = await User.login(email, password);
    //generate the token if registered
    const token = generateToken(user._id);
    //send the token back to frontend
    res.status(200).json({ email, token });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

//signup logic
const user_signup = async (req, res) => {
  const { email, password } = req.body;
  try {
    console.log("sending signup request....");
    const user = await User.signup(email, password);
    //generate the token if registered
    const token = generateToken(user._id);
    //send the token back to frontend
    res.status(201).json({ email, token });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = {
  user_login,
  user_signup,
};

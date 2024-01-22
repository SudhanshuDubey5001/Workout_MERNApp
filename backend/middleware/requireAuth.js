const jwt = require("jsonwebtoken");
const User = require("../modals/userModel");

// to verify the token is actually valid, we make this middleware
// token given by server once logged in must be a valid token as per SECRET key
const requireAuth = async (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization) {
    return res.status(401).json({ error: "Authorization token required" });
  }

  console.log("Authorization token = " + authorization);

  const token = authorization.split(" ")[1];

  try {
    const { _id } = jwt.verify(token, process.env.SECRET);
    //attach a new property user in the request so all the request can access that
    req.user = await User.findOne({ _id }).select("_id"); //just select the _id
    next();
  } catch (error) {
    res.status(401).json({ error: "Something went wrong while authenticating the user" });
  }
};

module.exports = requireAuth

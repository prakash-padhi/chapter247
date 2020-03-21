const jsonwebtoken = require("jsonwebtoken");
const config = require("config");

module.exports = function(req, res, next) {
  // Get token form header
  const token = req.header("x-auth-key");

  // Check if key present
  if (!token) {
    return res.status(401).json({ msg: "Authentication key not found" });
  }

  // Verify key
  try {
    const decoded = jsonwebtoken.verify(token, config.get("JWTKEY"));
    req.user = decoded.user;
    next();
  } catch (err) {
    res.status(401).json({ msg: "Invalid authentication key" });
  }
};

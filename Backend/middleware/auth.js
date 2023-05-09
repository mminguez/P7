require('dotenv').config();
const jwtSecret = process.env.JWT_SECRET;
const { verify: jwtVerify } = require("jsonwebtoken");

module.exports = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(403).json({ error: "unauthorized request" });
  }
  const token = authHeader.slice(7);
  try {
    const payload = jwtVerify(token, jwtSecret);
    req.user = payload;
    next();
  } catch (err) {
    return res.status(403).json({ error: "unauthorized request" });
  }
};

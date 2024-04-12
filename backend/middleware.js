import { JWT_SECRET } from "./config";
const jwt = require("jsonwebtoken");

const authMiddleware = (req, res, next) => {
  const auth = req.header.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(403).json({ msg: "Authorization failed" });
  }

  const token = auth.split(" ")[1];

  try {
    const verifiedValue = jwt.verify(token, JWT_SECRET);
    req.userId = verifiedValue.userId;

    next();
  } catch (err) {
    return res.status(403).json({ msg: "Authorization failed" });
  }
};

module.exports = {
  authMiddleware,
};

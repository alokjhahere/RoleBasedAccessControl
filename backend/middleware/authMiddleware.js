const jwt = require("jsonwebtoken");
const { users } = require("../data/db");

exports.authMiddleware = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({
        message: "Unauthorized: token missing",
      });
    }

    const token = authHeader.split(" ")[1];

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const user = users.find((u) => u.id === decoded.userId);

    if (!user) {
      return res.status(401).json({
        message: "Unauthorized: user not found",
      });
    }

    req.user = user; // 🔥 RBAC depends on this
    next();
  } catch (error) {
    return res.status(401).json({
      message: "Unauthorized: invalid or expired token",
    });
  }
};

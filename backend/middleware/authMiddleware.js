const { users } = require("../data/db");

exports.authMiddleware = async (req, res, next) => {
  try {
    // Read email from headers (temporary auth strategy)
    const email = req.headers["x-user-email"];

    if (!email) {
      return res.status(401).json({
        message: "Unauthorized: email not provided",
      });
    }

    // Find user in mock DB
    const user = users.find((u) => u.email === email);

    if (!user) {
      return res.status(401).json({
        message: "Unauthorized: user not found",
      });
    }

    // Attach user to request
    req.user = user;

    next(); // pass control to controller
  } catch (error) {
    return res.status(500).json({
      message: "Authentication failed",
    });
  }
};

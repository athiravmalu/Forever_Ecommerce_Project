const jwt = require("jsonwebtoken");

const authMiddleware = (req, res, next) => {
  try {
    const token = req.header("Authorization");

    if (!token) {
      return res.status(401).json({ success: false, message: "No token provided" });
    }

    // token may come as "Bearer <token>", so split it
    const actualToken = token.split(" ")[1] || token;

    // verify token
    const decoded = jwt.verify(actualToken, process.env.JWT_SECRET);
    req.user = decoded; // save decoded user info to request
    next();
  } catch (error) {
    console.error("Auth Error:", error.message);
    res.status(401).json({ success: false, message: "Invalid or expired token" });
  }
};

module.exports = authMiddleware;

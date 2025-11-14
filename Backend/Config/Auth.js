const jwt = require("jsonwebtoken");

const authUser = (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    const token = authHeader && authHeader.split(" ")[1]; // Extract after "Bearer"

    if (!token) {
      return res.status(401).json({ success: false, message: "No token provided" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.userId = decoded.id;
    next();
  } catch (error) {
    console.error("Auth Error:", error.message);
    res.status(401).json({ success: false, message: "Invalid or expired token" });
  }
};

module.exports = authUser;

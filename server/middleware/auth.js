const jwt = require("jsonwebtoken");
require("dotenv").config(); // Load environment variables

const isAuthenticated = (req, res, next) => {
  try {
    const token = req.cookies?.token;
    if (!token) {
      return res.status(401).json({
        message: "User not logged in",
        error: true,
        success: false,
      });
    }

    jwt.verify(token, "djbvunvuwheoufheowhfwuhefuhifwuehi", (err, decoded) => {
      if (err) {
        return res.status(401).json({
          message: "Invalid or expired token",
          error: true,
          success: false,
        });
      }

      req.body.user_id = decoded.id; // Store user ID in `req.user_id`
      next(); // Proceed to next middleware
    });

  } catch (error) {
    return res.status(500).json({
      message: "Internal Server Error",
      error: true,
      success: false,
    });
  }
};

module.exports = isAuthenticated;

const express = require("express");
const {
  getUsercart,
  addToCart,
  updateCart,
} = require("../Controllers/CartController");
const authMiddleware = require("../Middleware/Authmiddleware");

const router = express.Router();

// All these routes require login
router.post("/get", authMiddleware, getUsercart);
router.post("/add", authMiddleware, addToCart);
router.put("/update", authMiddleware, updateCart);

module.exports = router;

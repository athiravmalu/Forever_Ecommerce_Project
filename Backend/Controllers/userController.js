const User = require("../Models/userModel");
const bcrypt = require("bcrypt");
const validator = require("validator");
const jwt = require("jsonwebtoken");

// Helper function to create a JWT token
const createToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "7d" });
};

// ===============================
// Register User
// ===============================
exports.registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Check if user already exists
    const exist = await User.findOne({ email });
    if (exist) {
      return res.json({ success: false, message: "User already exists" });
    }

    // Validate email
    if (!validator.isEmail(email)) {
      return res.json({ success: false, message: "Please enter a valid email" });
    }

    // Validate password strength
    if (!validator.isStrongPassword(password)) {
      return res.json({
        success: false,
        message: "Please enter a stronger password (min 8 chars, 1 symbol, 1 number)",
      });
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create user
    const newUser = new User({ name, email, password: hashedPassword });
    const user = await newUser.save();

    // Create JWT token
    const token = createToken(user._id);

    res.json({ success: true, token ,id: user._id });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

// ===============================
// Login User
// ===============================
exports.loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check user existence
    const user = await User.findOne({ email });
    if (!user) {
      return res.json({ success: false, message: "User does not exist" });
    }

    // Compare password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.json({ success: false, message: "Invalid email or password" });
    }

    // Create token
    const token = createToken(user._id);
    res.json({ success: true, token, id: user._id });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

// ===============================
// Admin Login
// ===============================
exports.adminLogin = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (
      email === process.env.ADMIN_EMAIL &&
      password === process.env.ADMIN_PASSWORD
    ) {
      const token = jwt.sign({ email }, process.env.JWT_SECRET, { expiresIn: "1d" });
      console.log("Admin token generated");
      res.json({ success: true, token });
    } else {
      res.json({ success: false, message: "Invalid admin credentials" });
    }
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

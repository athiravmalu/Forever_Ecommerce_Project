const express = require('express');
const { registerUser, loginUser, adminLogin } = require('../Controllers/userController');

const router = express.Router();

// Public routes
router.post('/register', registerUser);
router.post('/login', loginUser);

// Admin login
router.post('/admin', adminLogin);

module.exports = router;

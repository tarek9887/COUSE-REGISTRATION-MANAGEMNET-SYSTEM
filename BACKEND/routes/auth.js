const express = require('express');
const router = express.Router();
const { registerUser, loginUser } = require('../controllers/authController');
const { authenticateToken } = require('../middleware/authMiddleware');

// Register Route
router.post('/register', registerUser);

// Login Route
router.post('/login', loginUser);

// ✅ Protected Route (for testing JWT)
router.get('/protected', authenticateToken, (req, res) => {
  res.json({
    message: 'This is a protected route!',
    user: req.user
  });
});

module.exports = router;

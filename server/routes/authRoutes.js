const express = require('express');
const router = express.Router();
const { register, login, logout, getMe, debugListUsers } = require('../controllers/authController');
const { protect } = require('../middleware/authMiddleware');

router.post('/register', register);
router.post('/login', login);
router.get('/logout', logout);
router.get('/me', protect, getMe);
router.get('/debug/users', debugListUsers);

module.exports = router; 
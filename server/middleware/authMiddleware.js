const jwt = require('jsonwebtoken');
const User = require('../models/userModel');

exports.protect = async (req, res, next) => {
  try {
    console.log('Cookies received:', req.cookies);
    let token;

    // Get token from cookie
    token = req.cookies.token;
    console.log('Token from cookie:', token);

    if (!token) {
      console.log('No token found in cookies');
      return res.status(401).json({ message: 'Not authorized to access this route' });
    }

    try {
      // Verify token
      console.log('Verifying token...');
      const decoded = jwt.verify(token, process.env.JWT_SECRET || 'your_jwt_secret_key_here');
      console.log('Token verified, decoded:', decoded);
      
      const user = await User.findById(decoded.id);
      console.log('User found:', user ? 'Yes' : 'No');
      
      if (!user) {
        console.log('User not found in database');
        return res.status(401).json({ message: 'User not found' });
      }

      req.user = user;
      next();
    } catch (error) {
      console.error('Token verification failed:', error);
      return res.status(401).json({ message: 'Not authorized to access this route' });
    }
  } catch (error) {
    console.error('Auth middleware error:', error);
    res.status(500).json({ message: error.message });
  }
}; 
const User = require('../models/userModel');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');

// Generate JWT Token
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET || 'your_jwt_secret_key_here', {
    expiresIn: '30d'
  });
};

// @desc    Register new user
// @route   POST /api/auth/register
// @access  Public
exports.register = async (req, res) => {
  try {
    console.log('Registration request body:', req.body);
    
    const { firstName, lastName, email, password } = req.body;

    // Validate required fields
    if (!firstName || !lastName || !email || !password) {
      console.log('Missing required fields:', { firstName, lastName, email, password: password ? 'provided' : 'missing' });
      return res.status(400).json({
        success: false,
        message: 'Please provide all required fields'
      });
    }

    // Check if user exists
    console.log('Checking for existing user with email:', email);
    const userExists = await User.findOne({ email: email.toLowerCase() });
    console.log('User exists check result:', userExists);

    if (userExists) {
      console.log('User already exists with email:', email);
      return res.status(400).json({
        success: false,
        message: 'User already exists'
      });
    }

    // Create user
    console.log('Creating new user...');
    const user = await User.create({
      firstName,
      lastName,
      email: email.toLowerCase(),
      password
    });
    console.log('User created successfully:', user._id);

    // Generate token
    const token = generateToken(user._id);

    // Send response
    res.status(201).json({
      success: true,
      data: {
        _id: user._id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        token
      }
    });

  } catch (error) {
    console.error('Registration error:', error);
    // Check for MongoDB duplicate key error
    if (error.code === 11000) {
      return res.status(400).json({
        success: false,
        message: 'Email already exists'
      });
    }
    res.status(500).json({
      success: false,
      message: 'Error registering user',
      error: error.message
    });
  }
};

// Login user
exports.login = async (req, res) => {
  try {
    console.log('Login attempt with:', { email: req.body.email });
    const { email, password } = req.body;
    
    const normalizedEmail = email.toLowerCase();
    console.log('Normalized email:', normalizedEmail);
    
    // Log MongoDB connection status
    console.log('MongoDB connection state:', mongoose.connection.readyState);
    
    // Check if user exists (convert email to lowercase)
    console.log('Attempting to find user with email:', normalizedEmail);
    const user = await User.findOne({ email: normalizedEmail }).select('+password');
    console.log('Database query result:', user);
    console.log('User found:', user ? 'Yes' : 'No');

    if (!user) {
      console.log('Login failed: User not found');
      return res.status(401).json({ 
        success: false,
        message: 'Invalid credentials' 
      });
    }

    // Check password
    const isMatch = await user.matchPassword(password);
    console.log('Password match:', isMatch ? 'Yes' : 'No');

    if (!isMatch) {
      console.log('Login failed: Invalid password');
      return res.status(401).json({ 
        success: false,
        message: 'Invalid credentials' 
      });
    }

    // Generate token
    const token = generateToken(user._id);
    console.log('Generated token:', token);

    // Set cookie
    const cookieOptions = {
      httpOnly: true,
      secure: false, // Set to false for development
      maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
      sameSite: 'strict',
      path: '/'
    };
    console.log('Setting cookie with options:', cookieOptions);
    
    res.cookie('token', token, cookieOptions);
    console.log('Cookie set successfully');

    // Send response
    res.status(200).json({
      success: true,
      user: {
        id: user._id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email
      }
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ 
      success: false,
      message: error.message 
    });
  }
};

// Logout user
exports.logout = (req, res) => {
  res.cookie('token', 'none', {
    expires: new Date(Date.now() + 10 * 1000),
    httpOnly: true
  });

  res.status(200).json({
    success: true,
    message: 'Logged out successfully'
  });
};

// Get current user
exports.getMe = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    res.status(200).json({
      success: true,
      user: {
        id: user._id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email
      }
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Debug endpoint to list all users (REMOVE IN PRODUCTION)
exports.debugListUsers = async (req, res) => {
  try {
    console.log('Current database:', mongoose.connection.db.databaseName);
    console.log('Current collections:', await mongoose.connection.db.listCollections().toArray());
    
    const users = await User.find({}, { email: 1, _id: 0 });
    console.log('All users in database:', users);
    
    res.status(200).json({
      success: true,
      databaseName: mongoose.connection.db.databaseName,
      users: users
    });
  } catch (error) {
    console.error('Debug endpoint error:', error);
    res.status(500).json({ 
      success: false,
      message: error.message 
    });
  }
}; 
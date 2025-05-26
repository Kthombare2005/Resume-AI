const { login } = require('../../controllers/authController');
const allowCors = require('../../middleware');
const connectDB = require('../../config/db');

// Connect to database
let isConnected = false;

const handler = async (req, res) => {
  try {
    // Connect to database if not already connected
    if (!isConnected) {
      await connectDB();
      isConnected = true;
    }

    // Log request details
    console.log('Login request:', {
      method: req.method,
      body: req.body,
      headers: req.headers
    });

    // Handle login
    if (req.method === 'POST') {
      return login(req, res);
    }

    // Method not allowed
    res.setHeader('Allow', ['POST']);
    return res.status(405).json({ success: false, message: `Method ${req.method} Not Allowed` });
  } catch (error) {
    console.error('Login handler error:', error);
    return res.status(500).json({
      success: false,
      message: 'Internal server error',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
};

module.exports = allowCors(handler); 
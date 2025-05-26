const allowCors = require('../middleware');
const connectDB = require('../config/db');

let isConnected = false;

const handler = async (req, res) => {
  try {
    // Try to connect to database if not already connected
    if (!isConnected) {
      await connectDB();
      isConnected = true;
    }

    return res.status(200).json({
      success: true,
      message: 'Server is healthy',
      environment: process.env.NODE_ENV,
      database: 'Connected',
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    console.error('Health check error:', error);
    return res.status(500).json({
      success: false,
      message: 'Server error',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined,
      timestamp: new Date().toISOString()
    });
  }
};

 
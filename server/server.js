// Load environment variables first
require('dotenv').config();

const express = require('express');
const cookieParser = require('cookie-parser');
const connectDB = require('./config/db');
const authRoutes = require('./routes/authRoutes');
const userRoutes = require('./routes/users');

const app = express();

// Parse JSON bodies and cookies
app.use(express.json());
app.use(cookieParser());

// Health check endpoint
app.get('/health', (req, res) => {
  res.status(200).json({ 
    status: 'ok', 
    environment: process.env.NODE_ENV
  });
});

// Routes
app.use('/auth', authRoutes);
app.use('/users', userRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('Error:', err);
  res.status(err.status || 500).json({ 
    success: false,
    message: process.env.NODE_ENV === 'development' ? err.message : 'Something went wrong!'
  });
});

// Connect to database
connectDB();

// For local development
if (process.env.NODE_ENV !== 'production') {
  const cors = require('cors');
  app.use(cors({
    origin: ['http://localhost:3000', 'http://localhost:5173'],
    credentials: true
  }));
  
  const PORT = process.env.PORT || 5000;
  app.listen(PORT, () => {
    console.log(`Server running in ${process.env.NODE_ENV || 'development'} mode on port ${PORT}`);
  });
}

// Export for Vercel
module.exports = app; 
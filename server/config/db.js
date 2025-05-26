const mongoose = require('mongoose');
require('dotenv').config();

// Set strictQuery to false to prepare for Mongoose 7
mongoose.set('strictQuery', false);

let cachedConnection = null;

const connectDB = async () => {
  if (cachedConnection) {
    console.log('Using cached database connection');
    return cachedConnection;
  }

  try {
    const MONGODB_URI = (typeof process !== 'undefined' && process.env && process.env.MONGODB_URI) || 'mongodb://127.0.0.1:27017/resumeai';
    
    const conn = await mongoose.connect(MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      bufferCommands: false,
      retryWrites: true,
      w: 'majority',
      maxPoolSize: 10,
      serverSelectionTimeoutMS: 5000,
      socketTimeoutMS: 45000,
    });

    console.log(`MongoDB Connected: ${conn.connection.host}`);
    
    cachedConnection = conn;
    
    // Handle connection errors after initial connection
    mongoose.connection.on('error', err => {
      console.error('MongoDB connection error:', err);
      cachedConnection = null;
    });

    mongoose.connection.on('disconnected', () => {
      console.log('MongoDB disconnected');
      cachedConnection = null;
    });

    // Handle process termination if process is available
    if (typeof process !== 'undefined') {
      process.on('SIGINT', async () => {
        await mongoose.connection.close();
        process.exit(0);
      });
    }

    return conn;
  } catch (error) {
    console.error(`MongoDB Connection Error: ${error.message}`);
    console.error('Please check your MONGODB_URI in .env file and make sure your IP address is whitelisted in MongoDB Atlas');
    cachedConnection = null;
    throw error;
  }
};

module.exports = connectDB; 
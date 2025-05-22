const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    // Close any existing connections
    if (mongoose.connection.readyState !== 0) {
      await mongoose.connection.close();
    }

    // Force the database name to be 'resumeai'
    const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/resumeai';
    
    // Ensure we're using the correct database name
    const conn = await mongoose.connect(MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      dbName: 'resumeai' // Explicitly set the database name
    });

    console.log('MongoDB Connection State:', mongoose.connection.readyState);
    console.log(`MongoDB Connected: ${conn.connection.host}`);
    console.log(`Database Name: ${conn.connection.name}`);
    console.log('Connected to MongoDB URL:', mongoose.connection.host + '/' + mongoose.connection.name);

  } catch (error) {
    console.error(`MongoDB Connection Error: ${error.message}`);
    process.exit(1);
  }
};

module.exports = connectDB; 
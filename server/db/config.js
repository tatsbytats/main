const mongoose = require('mongoose');

// Function to connect to MongoDB
const connectDB = async () => {
  try {
    // Always use the test database as the main database
    const connectionString = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/test';
    console.log('Connecting to MongoDB at:', connectionString.replace(/mongodb:\/\/([^:]+):[^@]+@/, 'mongodb://$1:****@'));

    await mongoose.connect(connectionString, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log('MongoDB connected successfully');

    // Test the connection
    mongoose.connection.on('error', err => {
      console.error('MongoDB connection error:', err);
    });

    mongoose.connection.on('disconnected', () => {
      console.warn('MongoDB disconnected');
    });

  } catch (err) {
    console.error('MongoDB connection error:', err);
    console.error('Please make sure MongoDB is running and accessible');
    process.exit(1); // Exit the process with failure
  }
};

module.exports = connectDB;

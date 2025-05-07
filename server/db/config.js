const mongoose = require('mongoose');

// Function to connect to MongoDB
const connectDB = async () => {
  try {
    // Use Atlas connection string from environment variable or fallback to local
    const connectionString = process.env.MONGODB_URI || 'mongodb+srv://tats:iamjustine@cluster0.atq0p03.mongodb.net/<database>?retryWrites=true&w=majority';
    console.log('Connecting to MongoDB at:', connectionString.replace(/mongodb(\+srv)?:\/\/([^:]+):[^@]+@/, 'mongodb$1://$2:****@'));

    await mongoose.connect(connectionString);

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

// server.js - Express backend with MongoDB integration
const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const cors = require('cors'); // Uncommented
require('dotenv').config();

// Database and Models
const connectDB = require('./db/config');
const AnimalRescueRequest = require('./models/AnimalRescueRequest');
const User = require('./models/User');
const Event = require('./models/Event');
const createAdmins = require('./seed');
// Routes
const animalRoutes = require('./routes/animals');
const adoptRoutes = require('./routes/adopt');
const rescueRequestRoutes = require('./routes/rescueRequests');
const eventRoutes = require('./routes/events');
const userRoutes = require('./routes/users');

const app = express();
const PORT = process.env.PORT || 5000;

// Enhanced CORS Configuration
app.use(cors({
  origin: '*', // Allow all origins for testing
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

// Add CORS headers directly for additional safety
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');

  // Handle preflight requests
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  next();
});

// Log all requests for debugging
app.use((req, res, next) => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.url}`);
  next();
});

// Body Parsing Middleware
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Connect to MongoDB
connectDB();
createAdmins();

// Ensure uploads directory exists
const uploadsDir = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadsDir)) {
  console.log('Creating uploads directory:', uploadsDir);
  fs.mkdirSync(uploadsDir, { recursive: true });
}

// Multer Configuration (unchanged from your version)
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadDir = path.join(__dirname, 'uploads');
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    const ext = path.extname(file.originalname);
    cb(null, 'rescue-' + uniqueSuffix + ext);
  }
});

const upload = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 },
  fileFilter: (req, file, cb) => {
    if (file.mimetype.startsWith('image/')) {
      cb(null, true);
    } else {
      cb(new Error('Only images are allowed'));
    }
  }
});

// Test route to check if server is running
app.get('/api/test', (req, res) => {
  res.json({
    success: true,
    message: 'Server is running correctly',
    timestamp: new Date().toISOString()
  });
});

// Routes
app.use('/api/animals', animalRoutes);
app.use('/api/adopt', adoptRoutes);
app.use('/api/rescue-requests', rescueRequestRoutes);
app.use('/api/events', eventRoutes);
app.use('/api/users', userRoutes);

// upload
app.use('/uploads', express.static('uploads'));
app.use(express.static('client/build'));

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

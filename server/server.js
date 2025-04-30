// server.js
const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const cors = require('cors');
const dotenv = require('dotenv');
const { body, validationResult } = require('express-validator');

// Load environment variables
dotenv.config();

// Initialize Express app
const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB Connection
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/pet-adoption', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('MongoDB connected successfully'))
.catch(err => console.error('MongoDB connection error:', err));

// Define User Schema
const userSchema = new mongoose.Schema({
  // Basic User Info
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  phone: { type: String, required: true },
  address: { type: String, required: true },
  password: { type: String, required: true },
  
  // Adoption-Relevant Info
  dateOfBirth: { type: Date, required: true },
  residenceType: { type: String, required: true },
  housingStatus: { type: String, required: true },
  householdMembers: {
    adults: { type: Number, required: true },
    children: { type: Number, required: true },
    otherPets: { type: String }
  },
  petExperience: { type: String, required: true },
  
  // Pet Preferences
  petType: { type: String, required: true },
  preferredAge: { type: String },
  preferredSize: { type: String },
  preferredBreed: { type: String },
  
  // Optional Info
  veterinarianInfo: { type: String },
  
  // Terms and Subscriptions
  subscribeNewsletter: { type: Boolean, default: false },
  
  // Timestamps
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

// Create User model
const User = mongoose.model('User', userSchema);

// Validation middleware for registration
const validateRegistration = [
  body('firstName').trim().notEmpty().withMessage('First name is required'),
  body('lastName').trim().notEmpty().withMessage('Last name is required'),
  body('email').isEmail().withMessage('Please provide a valid email'),
  body('phone').notEmpty().withMessage('Phone number is required'),
  body('address').notEmpty().withMessage('Address is required'),
  body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters'),
  body('dateOfBirth').isDate().withMessage('Valid date of birth is required'),
  body('residenceType').notEmpty().withMessage('Residence type is required'),
  body('housingStatus').notEmpty().withMessage('Housing status is required'),
  body('householdMembers.adults').isInt({ min: 1 }).withMessage('At least one adult is required'),
  body('householdMembers.children').isInt({ min: 0 }).withMessage('Number of children must be valid'),
  body('petExperience').notEmpty().withMessage('Pet experience information is required'),
  body('petType').notEmpty().withMessage('Pet type preference is required')
];

// Registration route
app.post('/api/register', validateRegistration, async (req, res) => {
  try {
    // Check for validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ success: false, message: 'Validation failed', errors: errors.array() });
    }

    // Check if email already exists
    const emailExists = await User.findOne({ email: req.body.email });
    if (emailExists) {
      return res.status(400).json({ success: false, message: 'Email already registered' });
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);

    // Create new user object
    const newUser = new User({
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      phone: req.body.phone,
      address: req.body.address,
      password: hashedPassword,
      
      dateOfBirth: req.body.dateOfBirth,
      residenceType: req.body.residenceType,
      housingStatus: req.body.housingStatus,
      householdMembers: {
        adults: req.body.householdMembers.adults,
        children: req.body.householdMembers.children,
        otherPets: req.body.householdMembers.otherPets
      },
      petExperience: req.body.petExperience,
      
      petType: req.body.petType,
      preferredAge: req.body.preferredAge,
      preferredSize: req.body.preferredSize,
      preferredBreed: req.body.preferredBreed,
      
      veterinarianInfo: req.body.veterinarianInfo,
      subscribeNewsletter: req.body.subscribeNewsletter
    });

    // Save user to database
    const savedUser = await newUser.save();

    // Remove password from response
    const userResponse = {
      _id: savedUser._id,
      firstName: savedUser.firstName,
      lastName: savedUser.lastName,
      email: savedUser.email
    };

    res.status(201).json({
      success: true,
      message: 'Registration successful',
      user: userResponse
    });
  } catch (error) {
    console.error('Registration error:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Server error during registration',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
});

// Simple login route (for demonstration)
app.post('/api/login', async (req, res) => {
  try {
    // Find user by email
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
      return res.status(400).json({ success: false, message: 'Invalid email or password' });
    }

    // Validate password
    const validPassword = await bcrypt.compare(req.body.password, user.password);
    if (!validPassword) {
      return res.status(400).json({ success: false, message: 'Invalid email or password' });
    }

    // Generate JWT (in a real application)
    // const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET);

    res.status(200).json({
      success: true,
      message: 'Login successful',
      user: {
        _id: user._id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email
      }
      // token: token // Would include this in a real application
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ success: false, message: 'Server error during login' });
  }
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
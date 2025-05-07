const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const AnimalRescueRequest = require('../models/AnimalRescueRequest');

// Set up multer storage configuration
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadDir = path.join(__dirname, '..', 'uploads');
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
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB limit
  fileFilter: (req, file, cb) => {
    if (file.mimetype.startsWith('image/')) {
      cb(null, true);
    } else {
      cb(new Error('Only images are allowed'));
    }
  }
});

// POST /api/rescue-requests - Create a new rescue request
router.post('/', upload.single('photo'), async (req, res) => {
  try {
    console.log('Received rescue request:', req.body);
    console.log('File received:', req.file);

    // Generate a unique request ID
    const requestId = 'TAARA-' + new Date().getFullYear() + '-' +
                     Math.floor(1000 + Math.random() * 9000);

    // Create a new rescue request
    const rescueRequest = new AnimalRescueRequest({
      fullName: req.body.fullName || '',
      contactNumber: req.body.contactNumber || '',
      email: req.body.email || '',
      tag: req.body.tag || 'Neglect',
      concern: req.body.concern || '',
      locationNote: req.body.locationNote || '',
      photoUrl: req.file ? `/uploads/${req.file.filename}` : null,
      photoContentType: req.file ? req.file.mimetype : null
    });

    console.log('Created rescue request object:', rescueRequest);

    // Save the rescue request to the database
    await rescueRequest.save();
    console.log('Rescue request saved successfully');

    // Return success response
    res.status(201).json({
      success: true,
      message: 'Rescue request submitted successfully',
      requestId: requestId
    });
  } catch (error) {
    console.error('Error submitting rescue request:', error);

    // Check for validation errors
    if (error.name === 'ValidationError') {
      const validationErrors = {};

      // Extract validation error messages
      for (const field in error.errors) {
        validationErrors[field] = error.errors[field].message;
      }

      console.error('Validation errors:', validationErrors);

      return res.status(400).json({
        success: false,
        message: 'Validation failed',
        errors: validationErrors
      });
    }

    // Handle other types of errors
    res.status(500).json({
      success: false,
      message: 'Failed to submit rescue request',
      error: error.message
    });
  }
});

// GET /api/rescue-requests - Get all rescue requests (admin only)
router.get('/', async (req, res) => {
  try {
    const rescueRequests = await AnimalRescueRequest.find()
      .sort({ createdAt: -1 });

    res.json(rescueRequests);
  } catch (error) {
    console.error('Error fetching rescue requests:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch rescue requests',
      error: error.message
    });
  }
});

// GET /api/rescue-requests/:id - Get a specific rescue request
router.get('/:id', async (req, res) => {
  try {
    const rescueRequest = await AnimalRescueRequest.findById(req.params.id);

    if (!rescueRequest) {
      return res.status(404).json({
        success: false,
        message: 'Rescue request not found'
      });
    }

    res.json(rescueRequest);
  } catch (error) {
    console.error('Error fetching rescue request:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch rescue request',
      error: error.message
    });
  }
});

module.exports = router;

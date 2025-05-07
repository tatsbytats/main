const express = require('express');
const multer = require('multer');
const Animal = require('../models/Animal');
const router = express.Router();

// Set storage destination and filename
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname);
  }
});

const upload = multer({ storage });

// Handle form submission with image
router.post('/', upload.single('image'), async (req, res) => {
  try {
    const animal = new Animal({
      ...req.body,
      imageUrl: req.file ? `/uploads/${req.file.filename}` : ''
    });
    await animal.save();
    res.status(201).json({ message: 'Animal report submitted successfully' });
  } catch (error) {
    console.error('Error submitting animal report:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// GET all animals
router.get('/', async (req, res) => {
  try {
    const animals = await Animal.find();
    res.json(animals);
  } catch (error) {
    console.error('Error fetching animals:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;

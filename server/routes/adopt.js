const express = require('express');
const router = express.Router();
const Animal = require('../models/Animal');

router.get('/', async (req, res) => {
  try {
    const pets = await Animal.find({});
    
    // Explicitly set content-type
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(pets);
    
  } catch (err) {
    console.error('Database error:', err);
    res.status(500).json({ 
      error: 'Server error',
      details: err.message 
    });
  }
});

module.exports = router;
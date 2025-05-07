const express = require('express');
const router = express.Router();
const Application = require('../models/Application');

// POST /api/applications
router.post('/', async (req, res) => {
  try {
    const newApplication = new Application(req.body);
    await newApplication.save();
    res.status(201).json({ message: 'Application submitted successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to submit application' });
  }
});

module.exports = router;

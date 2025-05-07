// MongoDB Schema for Animal Rescue Requests
const mongoose = require('mongoose');

// Define the schema
const animalRescueRequestSchema = new mongoose.Schema({
  fullName: {
    type: String,
    required: [true, 'Name is required'],
    trim: true
  },
  contactNumber: {
    type: String,
    required: [true, 'Contact number is required'],
    trim: true
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    trim: true,
    lowercase: true,
    match: [/^\S+@\S+\.\S+$/, 'Please enter a valid email address']
  },
  tag: {
    type: String,
    required: [true, 'Emergency tag is required'],
    enum: {
      values: ['Neglect', 'Accident', 'Cruelty', 'Lost', 'Missing'],
      message: 'Tag must be one of: Neglect, Accident, Cruelty, Lost, Missing'
    },
    default: 'Neglect'
  },
  concern: {
    type: String,
    required: [true, 'Description of the situation is required']
  },
  locationNote: {
    type: String,
    required: [true, 'Location details are required']
  },
  photoUrl: {
    type: String,
    default: null
  },
  photoData: {
    type: Buffer,
    default: null
  },
  photoContentType: {
    type: String,
    default: null
  },
  status: {
    type: String,
    enum: ['pending', 'in-progress', 'resolved', 'closed'],
    default: 'pending'
  },
  assignedTo: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    default: null
  },
  notes: [{
    text: String,
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    },
    createdAt: {
      type: Date,
      default: Date.now
    }
  }],
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

// Create a model from the schema
const AnimalRescueRequest = mongoose.model('AnimalRescueRequest', animalRescueRequestSchema);

module.exports = AnimalRescueRequest;
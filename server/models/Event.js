const mongoose = require('mongoose');

const EventSchema = new mongoose.Schema({
  title: { 
    type: String, 
    required: [true, 'Event title is required'],
    trim: true
  },
  date: { 
    type: Date, 
    required: [true, 'Event date is required']
  },
  time: { 
    type: String, 
    required: [true, 'Event time is required'],
    trim: true
  },
  location: { 
    type: String, 
    required: [true, 'Event location is required'],
    trim: true
  },
  description: { 
    type: String, 
    required: [true, 'Event description is required']
  },
  status: { 
    type: String, 
    enum: ['confirmed', 'pending', 'cancelled'],
    default: 'pending'
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

// Update the updatedAt field on save
EventSchema.pre('save', function(next) {
  this.updatedAt = Date.now();
  next();
});

module.exports = mongoose.model('Event', EventSchema);

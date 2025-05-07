const mongoose = require('mongoose');

const ApplicationSchema = new mongoose.Schema({
  name: { type: String, required: true },
  contact: { type: String, required: true },
  address: { type: String, required: true },
  petType: { type: String, required: true },
  reason: { type: String, required: true },
  experience: { type: String },
  notes: { type: String },
}, { timestamps: true });

module.exports = mongoose.model('Application', ApplicationSchema);

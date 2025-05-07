const mongoose = require('mongoose');

const animalSchema = new mongoose.Schema({
  date: String,
  name: String,
  breed: String,
  address: String,
  reporter: String,
  remarks: String,
  imageUrl: String // ✅ store the file path or URL
});

module.exports = mongoose.model('Animal', animalSchema);

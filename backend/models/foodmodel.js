const mongoose = require('mongoose');

const FoodSchema = new mongoose.Schema({
  type: String, // e.g., Breakfast, Lunch, Dinner
  description: String,
  photos: [String] // Array of photo URLs
});

module.exports = mongoose.model('Food', FoodSchema);
const mongoose = require('mongoose');

const AccommodationSchema = new mongoose.Schema({
  type: String, // e.g., Deluxe Tent, Shared Room
  description: String,
  price: Number,
  shared: Boolean,
  amenities: [String],
  images: [String] // Array of image URLs
});

module.exports = mongoose.model('Accommodation', AccommodationSchema);
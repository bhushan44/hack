const mongoose = require('mongoose');

const ReviewSchema = new mongoose.Schema({
  user: { 
    type: mongoose.Schema.Types.ObjectId, // Reference to the User model
    ref: 'User', // The name of the model being referenced
    required: [true, 'User reference is required'] 
  },
  accommodation: { 
    type: mongoose.Schema.Types.ObjectId, // Reference to the Accommodation model
    ref: 'Accommodation', // The name of the model being referenced
    required: [true, 'Accommodation reference is required'] 
  },
  retreatcenter: { 
    type: mongoose.Schema.Types.ObjectId, // Reference to the Retreat model
    ref: 'Retreat', // The name of the model being referenced
  },
  rating: { 
    type: Number, 
    min: 1, 
    max: 5, 
    required: [true, 'Rating is required'] 
  },
  reviewText: { 
    type: String, 
    required: [true, 'Review text is required'] 
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

module.exports = mongoose.model('Review', ReviewSchema);

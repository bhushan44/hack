const mongoose = require('mongoose');

const FoodSchema = new mongoose.Schema({
  type: { 
    type: [String], // Array of types like Breakfast, Lunch, Dinner
    required: [true, 'Food type is required'] 
  },
  description: { 
    type: [String], // Array of descriptions
    required: [true, 'Food description is required'] 
  },
  photos: [String], // Array of photo URLs
  retreatcenter: { 
    type: mongoose.Schema.Types.ObjectId, // Reference to the Retreat model
    ref: 'Retreat', // The name of the model being referenced
    required: [true, 'Retreat reference is required'] 
  }
});

module.exports = mongoose.model('Food', FoodSchema);


const mongoose = require('mongoose');

const AccommodationSchema = new mongoose.Schema({
  type: { 
    type: String, 
    required: [true, 'Accommodation type is required'] 
  },
  description: { 
    type: String, 
    required: [true, 'Accommodation description is required'] 
  },
  price: { 
    type: Number, 
    required: [true, 'Accommodation price is required'] 
  },
  shared: { 
    type: Boolean, 
    required: [true, 'Shared status is required'] 
  },
  amenities: { 
    type: [String], 
    required: [true, 'Amenities are required'] 
  },
  images: { 
    type: [String], 
    required: [true, 'Accommodation images are required'] 
  },
  retreatcenter: { 
    type: mongoose.Schema.Types.ObjectId, // Reference to the Retreat model
    ref: 'Retreat', // The name of the model being referenced
    required: [true, 'Retreat reference is required'] 
  }
});

module.exports = mongoose.model('Accommodation', AccommodationSchema);

const mongoose = require('mongoose');

const BookingSchema = new mongoose.Schema({
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
    required: [true, 'Retreat reference is required'] 
  },
  checkInDate: { 
    type: Date, 
    required: [true, 'Check-in date is required'] 
  },
  checkOutDate: { 
    type: Date, 
    required: [true, 'Check-out date is required'] 
  },
  numberOfGuests: { 
    type: Number, 
    required: [true, 'Number of guests is required'] 
  },
//  

  status: { 
    type: String, 
    enum: ['Pending', 'Confirmed', 'Cancelled'], 
    default: 'Pending' 
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

module.exports = mongoose.model('Booking', BookingSchema);

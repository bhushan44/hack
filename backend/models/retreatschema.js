const mongoose = require('mongoose');

const RetreatSchema = new mongoose.Schema({
  name: { 
    type: String, 
    required: [true, 'Name is required'], 
    unique: [true, 'Name must be unique'] 
  },
  location: { 
    type: String, 
    required: [true, 'Location is required'] 
  },
  description: { 
    type: String, 
    required: [true, 'Description is required'] 
  },
  features: { 
    type: [String], 
    required: [true, 'Features are required'] 
  },
  styles: { 
    type: [String], 
    required: [true, 'Styles are required'] 
  },
  skillLevel: { 
    type: [String], 
    required: [true, 'Skill levels are required'] 
  },
  benefits: { 
    type: [String], 
    required: [true, 'Benefits are required'] 
  },
  program: { 
    type: [String], 
    required: [true, 'Program is required'] 
  },
  instructors: [{ 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Instructor', 
    required: [true, 'At least one instructor is required'] 
  }],
  // foods: [{ 
  //   type: mongoose.Schema.Types.ObjectId, 
  //   ref: 'Food', 
  //   required: [true, 'At least one food item is required'] 
  // }],
  // accommodations: [{ 
  //   type: mongoose.Schema.Types.ObjectId, 
  //   ref: 'Accommodation', 
  //   required: [true, 'At least one accommodation is required'] 
  // }],

  images: { 
    type: [String], 
    required: [true, 'At least one image URL is required'] 
  },
  price: { 
    type:Number,
    required:[true,'price is required']
    // min: { 
    //   type: Number, 
    //   required: [true, 'Minimum price is required'] 
    // },
    // max: { 
    //   type: Number, 
    //   required: [true, 'Maximum price is required'] 
    // }
  }
});

module.exports = mongoose.model('Retreat', RetreatSchema);

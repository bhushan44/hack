const mongoose = require('mongoose');

const InstructorSchema = new mongoose.Schema({
  name: String,
  bio: String,
  qualifications: [String],
  photo: String 
});

module.exports = mongoose.model('Instructor', InstructorSchema);
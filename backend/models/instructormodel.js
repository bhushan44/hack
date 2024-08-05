const mongoose = require('mongoose');

const InstructorSchema = new mongoose.Schema({
  name: String,
  bio: String,
  qualifications: [String],
  photo: String // URL of the instructor's photo
});

module.exports = mongoose.model('Instructor', InstructorSchema);
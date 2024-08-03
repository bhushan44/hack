const Retreat = require("../models/retreatschema");

async function createRetreat(req, res) {
  try {
    // Get image URLs from files
    const urls = req.files.map(file => file.location);

    // Destructure input values without default values
    const { 
      name, 
      location, 
      description, 
      features, 
      styles, 
      skillLevel, 
      benefits, 
      program, 
      price 
    } = req.body;

    // Check if all required fields are present
    if (!name || !location || !description || !features || !styles || !skillLevel || !benefits || !program || !price) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    // Process and trim the array fields
    const featuresArray = features.split(',').map(item => item.trim());
    const stylesArray = styles.split(',').map(item => item.trim());
    const skillLevelArray = skillLevel.split(',').map(item => item.trim());
    const benefitsArray = benefits.split(',').map(item => item.trim());
    const programArray = program.split(',').map(item => item.trim());

    // Prepare data for saving
    const retreatData = new Retreat({
      name: name.trim(),
      location: location.trim(),
      description: description.trim(),
      features: featuresArray,
      styles: stylesArray,
      skillLevel: skillLevelArray,
      benefits: benefitsArray,
      program: programArray,
      price: parseFloat(price), // Ensure price is a number
      images: urls,
      instructors:["66882baab889bd22677f0466"]
    });

    // Save data and respond
    const data = await retreatData.save();
    res.json({
      status: "success",
      message: "Retreat created successfully",
      data
    });

  } catch (e) {
    res.json({
      status: "fail",
      message: e.message
    });
  }
}

async function getRetreats(req, res) {
  try {
    const data = await Retreat.find().populate("instructors");
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving retreats', error: error.message });
  }
}

module.exports = { createRetreat, getRetreats };

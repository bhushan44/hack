const Accommodation = require("../models/Accomodation");

async function createAccommodation(req, res) {
  // Assuming files are uploaded and stored in req.files
  const images = req.files?req.files.map(file => file.location):[]; // Adjust based on your file upload setup
  // Convert comma-separated styles into an array
  const styles = req.body.styles ? req.body.styles.split(',').map(style => style.trim()) : [];

  const { type, description, price, shared, amenities,retreatcenter } = req.body;

  try {
    const accommodationData = new Accommodation({
      type,
      description,
      price,
      shared: shared === 'true', // Convert to boolean if needed
      amenities, //amenities ? amenities.split(',').map(amenity => amenity.trim()) : [], // Convert comma-separated string to array if needed
      images,
      styles,
      retreatcenter
    });

    const data = await accommodationData.save();
    res.json({
      status: "success",
      message: "Accommodation created successfully",
      data
    });
  } catch (e) {
    res.json({
      status: "fail",
      message: e.message
    });
  }
}

async function getAccommodations(req, res) {
  try {
    const data = await Accommodation.find();
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving accommodations', error: error.message });
  }
}

module.exports = { createAccommodation, getAccommodations };

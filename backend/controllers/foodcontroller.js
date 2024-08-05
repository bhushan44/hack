const Food = require("../models/foodmodel");

async function createFood(req, res) {
  // Assuming files are uploaded and stored in req.files
  const photos = req.files.map(file => file.location);
   // or file.path depending on your setup

  let { type, description } = req.body;
  type=type.split(',').map((t)=>t.trim())

  try {
    const foodData = new Food({
      type,
      description,
      photos
    });

    const data = await foodData.save();
    res.json({
      status: "success",
      message: "Food item created successfully",
      data
    });
  } catch (e) {
    res.json({
      status: "fail",
      message: e.message
    });
  }
}

async function getFoods(req, res) {
  try {
    const data = await Food.find();
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving food items', error: error.message });
  }
}

module.exports = { createFood, getFoods };

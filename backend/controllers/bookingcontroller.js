const User=require("../models/usermodel")
const Accommodation=require("../models/Accomodation")
const Retreat=require("../models/retreatschema")
const createBooking = async (req, res) => {
    try {
      // Extract data from the request body
      const {  accommodationId, retreatId, checkInDate, checkOutDate, numberOfGuests, specialRequests } = req.body;
   if(!accommodationId ||!retreatId||!checkInDate||!checkOutDate||!numberOfGuests){
    res.json({
        status:"fail",
        message:"please provide al;l details"
    })
   }
      // Validate if user, accommodation, and retreat exist
      const user = await User.findById(req.user.id);
      const accommodation = await Accommodation.findById(accommodationId);
      const retreat = retreatId ? await Retreat.findById(retreatId) : null;
  
      if (!user) return res.status(404).json({ message: 'User not found' });
      if (!accommodation) return res.status(404).json({ message: 'Accommodation not found' });
      if (retreatId && !retreat) return res.status(404).json({ message: 'Retreat not found' });
  
      // Create a new booking
      const booking = new Booking({
        user: userId,
        accommodation: accommodationId,
        retreat: retreatId,
        checkInDate,
        checkOutDate,
        numberOfGuests,
        specialRequests,
        status: 'Pending' // Default status
      });
  
      // Save the booking to the database
      await booking.save();
  
      // Respond with the created booking
      res.status(201).json(booking);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Server error' });
    }
  };
  module.exports={createBooking}
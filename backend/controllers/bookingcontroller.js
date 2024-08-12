const User=require("../models/usermodel")
const Accommodation=require("../models/Accomodation")
const Retreat=require("../models/retreatschema")
const dotenv=require("dotenv")
const stripe = require("stripe")(process.env.SRIPE_SECREAT_KEY);
dotenv.config("./config.env")
const getBookings = async (req, res) => {
  try {
      const bookings = await Booking.find().populate('Retreat','accomdation');

      res.status(200).json({
          status: 'success',
          results: bookings.length,
          data: 
              bookings
          
      });
  } catch (err) {
      res.status(400).json({
          status: 'fail',
          message: err.message
      });
  }
};
const getCheckOutSession = async (req, res) => {
  try {
    console.log(req.user)
      const userId = req.user._id;

      // Find the tour by ID (this assumes you have a Tour model defined)
      const tour = await user.findById(userId);

      // Create checkout session
      const session = await stripe.checkout.sessions.create({
          payment_method_types: ['card'],
          mode: 'payment',
          success_url: `http://localhost:3000/bookings`,
          cancel_url: `http://localhost:3000/homepage`,
          customer_email: req.user.email,
          client_reference_id: tourId,
          line_items: [
              {
                  price_data: {
                      currency: 'inr',
                      product_data: {
                          name: tour.name,
                          description: tour.summary,
                          images: [tour.imageCover]
                      },
                      unit_amount: tour.price * 100,
                  },
                  quantity: 1
              }
          ]
      });

      res.status(200).json({
          status: 'success',
          session
      });
  } catch (err) {
      res.status(400).json({
          status: 'fail',
          message: err.message
      });
  }
};
const createBooking = async (req, res) => {
    try {
      // Extract data from the request body
      const {  accommodationId, retreatId, checkInDate, checkOutDate, numberOfGuests, specialRequests } = req.body;
   if(!accommodationId ||!retreatId||!checkInDate||!checkOutDate||!numberOfGuests){
    res.json({
        status:"fail",
        message:"please provide all details"
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
  module.exports={createBooking,getCheckOutSession,getBookings}
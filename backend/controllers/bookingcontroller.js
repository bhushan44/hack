const User=require("../models/usermodel")
const Accommodation=require("../models/Accomodation")
const Retreat=require("../models/retreatschema")
const dotenv=require("dotenv")
const stripe = require("stripe")("sk_test_51PmqlbSEMPj85mjmVDwkiMyhwzA4gMFlkg0haf5watHFIJ5kkgJvUqa01hLdQJn5dZqqwXLUrpwHJ3U7vnnV3d5H005QURbfJ0");
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
      const session = await stripe.checkout.sessions.create({
        payment_method_types: ['card'],
        line_items: [
          {
            price_data: {
              currency: 'usd',
              product_data: {
                name: req.body.data.name,
                metadata: {
                    retreatId: req.body.data._id,
                    retreat_name: req.body.data.name,
                  },
              },
              unit_amount: req.body.data.price * 100, // Convert to cents
            },
            quantity: 1,
          },
        ],
        mode: 'payment',
        success_url: 'http://localhost:3000/crete',
        cancel_url: 'http://localhost:3000/',
        // metadata: {
        //   retreatId: req.body.data._id,
        //   retreat_name: req.body.data.name,
        // },
      });
  
      res.json({ id: session.id });
    } catch (error) {
      console.error('Error creating checkout session:', error);
      res.status(500).json({ error: 'Internal Server Error' });
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
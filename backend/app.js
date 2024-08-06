const express = require("express");
const app = express();
const dotenv = require("dotenv");
const cors = require("cors");
const multer = require("multer");
const path = require("path");
const multerS3 = require("multer-s3");
const aws = require("@aws-sdk/client-s3");

// Import controllers
const {
  createuser,
  getusers,
  deleteuser,
  getuser,
  signin,
  updateme,
  deleteme,
  login,
} = require("./controllers/usercontroller");

const {
  protect,
  restrictTo,
  forgetpasswordresettoken,
  resetpassword,
  updatepassword,
} = require("./controllers/authcontroller");

const { sendotp } = require("./controllers/otpcontroller");
const {createRetreat,getRetreats,getRetreatData}=require("./controllers/retreatcontroller")
const{createFood,getFoods}=require("./controllers/foodcontroller")
const {createAccommodation,getAccommodations}=require("./controllers/accomodationcontroller")
const{createBooking}=require("./controllers/bookingcontroller")
const {getinstructor,createinstructor}=require("./controllers/instructorController")
const {getuser,getusers,createuser}=require("./controllers/usercontroller")

// Load environment variables
dotenv.config({ path: "./config.env" });

// AWS S3 setup
const s3 = new aws.S3({
  region: process.env.region,
  credentials: {
    accessKeyId: process.env.accesskey,
    secretAccessKey: process.env.secretkey,
  },
});

// Multer setup for image uploads
const uploadImages = () => {
  return multer({
    storage: multerS3({
      s3: s3,
      bucket: "user-profile-s3", // Replace with your bucket name
      // acl: "public-read",
      metadata: function (req, file, cb) {
        cb(null, { fieldName: file.fieldname });
      },
      key: function (req, file, cb) {
        cb(null, `images/${Date.now()}-${file.originalname}`);
      },
    }),
    limits: { fileSize: 5 * 1024 * 1024 }, // Limit file size to 5 MB
    fileFilter: function (req, file, cb) {
      if (file.mimetype.startsWith("image")) {
        cb(null, true);
      } else {
        cb(new Error("Not an image! Please upload only images."), false);
      }
    },
  });
};

// Initialize upload middleware
const upload = uploadImages();

// Single image upload route
const setImage = (req, res, next) => {
  const uploadSingle = upload.single("photo");
  uploadSingle(req, res, async (err) => {
    if (err) return res.status(400).json({ success: false, message: err.message });

    // console.log(req.file);
    next();
  });
};

// Multiple images upload route
const setImages = (req, res, next) => {
  const uploadMultiple = upload.array("photos", 10); // Adjust name and maxCount as needed
  uploadMultiple(req, res, async (err) => {
    if (err) return res.status(400).json({ success: false, message: err.message });

    // console.log(req.files);
    // res.status(200).json({ success: true, fileUrls: req.files.map(file => file.location) });
    next()
  });
};

// Setup Multer for tour images
const multerStorage2 = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public/images/tours");
  },
  filename: (req, file, cb) => {
    const ext = file.mimetype.split("/")[1];
    cb(null, `tour-${req.params.id}-${Date.now()}.${ext}`);
  },
});

const multerFilter = (req, file, cb) => {
  if (file.mimetype.startsWith("image")) {
    cb(null, true);
  } else {
    cb(new Error("Not an image! Please upload only images."), false);
  }
};

const tourUpload = multer({
  storage: multerStorage2,
  fileFilter: multerFilter,
});

const upload2 = tourUpload.fields([
  { name: "imageCover", maxCount: 1 },
  { name: "images", maxCount: 3 },
]);

// Middleware setup
app.use(express.json());
app.use(cors());
app.use("/images", express.static(path.join(__dirname, "/public/images")));

// Define routes
app.route("/api/v1/users").get(protect, getusers).post(createuser);
app.route("/api/v1/user").get(protect, getuser);
app.route("/api/v1/sendotp").post(sendotp);
app.route("/api/v1/login").post(signin);
app.route("/api/v1/signin").post(login);
app.route("/api/v1/forgetpassword").post(forgetpasswordresettoken);
app.route("/api/v1/resetpassword/:token").post(resetpassword);
app.route("/api/v1/updatepassword").patch(protect, updatepassword);
app.route("/api/v1/updateuser").patch(protect, setImage, updateme);
app.route("/api/v1/deleteuser").delete(protect, deleteme);
app.route("/api/v1/createretreat").post(setImages,createRetreat);
app.route("/api/v1/getretreats").get(getRetreats)
app.route("/api/v1/createfood").post(setImages,createFood);
app.route("/api/v1/getfoods").get(getFoods)
app.route("/api/v1/createaccomodation").post(setImages,createAccommodation);
app.route("/api/v1/getaccomodations").get(getAccommodations)
app.route("/api/v1/createbooking").post(protect,createBooking)
app.route("/api/:userid").get(getRetreatData)
app.route("/api/v1/getinstructor").get(getinstructor)
app.route("/api/v1/createinstructor").post(setImage,createinstructor)
app.get("/", (req, res) => {
  res.send("Welcome to the API!");
});

// Start server
app.listen(5000, () => {
  console.log("App listening on port 5000");
});

module.exports=app

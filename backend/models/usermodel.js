const mongoose = require("mongoose");
const crypto = require("crypto");
const validator = require("validator");
const bcrypt = require("bcryptjs");

const userschema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "User must have a name"],
  },
  role: {
    type: String,
    enum: ["user", "instructor", "admin", "lead-guide"], // Updated roles
    default: "user",
  },
  email: {
    type: String,
    required: [true, "User must have an email"],
    unique: true,
    validate: [validator.isEmail, "Please provide a valid email"],
  },
  password: {
    type: String,
    required: [true, "Please provide a password"],
  },
  conformPassword: {
    type: String,
    required: [true, "Please confirm your password"],
    validate: {
      validator: function (el) {
        return this.password === el;
      },
      message: "Passwords do not match",
    },
  },
  changePasswordAt: Date,
  passwordResetToken: String,
  passwordResetExpiresIn: Date,
  active: {
    type: Boolean,
    default: true, // Default to true for active users
    select: false,
  },
  photo: {
    type: String,
    default: "default.jpg",
  },
  // Role-specific fields
  expertise: { // For instructors
    type: [String],
    default: [],
  },
  certifications: { // For instructors
    type: [String],
    default: [],
  },
  permissions: { // For admins
    type: [String],
    enum: ["read", "write", "delete"], // Example permissions
    default: ["read"],
  },
});

// Encrypt password before saving
userschema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    return next();
  }
  this.password = await bcrypt.hash(this.password, 12);
  this.conformPassword = undefined;
  next();
});

userschema.pre("save", function (next) {
  if (!this.isModified("password") || this.isNew) {
    return next();
  }
  this.changepasswordat = Date.now() - 1000;
  next();
});
userschema.methods.correctpassword = async function (
  candidatepassword,
  password
) {
  return await bcrypt.compare(candidatepassword, password);
};
userschema.methods.changedpasswordafter = function (jwt) {
  if (this.changepasswordat) {
    let time = this.changepasswordat.getTime() / 1000;
    return jwt < time;
    // retrun;
  }
  return false;
};
userschema.methods.createpasswordresettoken = function () {
  const resettokken = crypto.randomBytes(32).toString("hex");
  this.passwordresettoken = crypto
    .createHash("sha256")
    .update(resettokken)
    .digest("hex");
  this.passwordresetexpiresin = Date.now() + 3 * 60 * 1000;
  return resettokken;
};
const User = mongoose.model("User", userschema);
module.exports = User;
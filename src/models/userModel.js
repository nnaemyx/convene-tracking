const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: String,
  email: String,
  password: String,
  role: {
    type: String,
    required: [true],
    default: "customer",
    enum: ["customer", "admin"],
  },
  resetToken: {
    type: String,
  },
  resetTokenExpires: {
    type: String,
  },
  // Other user fields...
});

const User = mongoose.model('User', userSchema);

module.exports = User;

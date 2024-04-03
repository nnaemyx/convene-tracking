const mongoose = require("mongoose");
const Schema = mongoose.Schema;

if (!mongoose.models.User) {
  const userSchema = new Schema({
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
  });

  mongoose.model("User", userSchema);
}

module.exports = mongoose.model("User");

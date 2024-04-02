const mongoose = require("mongoose");
const Schema = mongoose.Schema;

if (!mongoose.models.Meetups) {
  const meetupSchema = new Schema({
    title: { type: String },
    description: { type: String},
    images: {
      type: [String],
    },
  });
  mongoose.model("Meetups", meetupSchema);
}


module.exports = mongoose.model("Meetups");

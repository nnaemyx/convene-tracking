const mongoose = require("mongoose");
const Schema = mongoose.Schema;

if (!mongoose.models.Question) {
  const questionSchema = new Schema({
    meetup: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Meetup",
      required: true,
    },
    question: { type: String, required: true },
    upvotes: { type: Number, default: 0 },
    downvotes: { type: Number, default: 0 },
  });
  mongoose.model("Question", questionSchema);
}


module.exports = mongoose.model("Question");

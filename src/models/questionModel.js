const mongoose = require('mongoose');

const questionSchema = new mongoose.Schema({
  meetup: { type: mongoose.Schema.Types.ObjectId, ref: 'Meetup', required: true },
  question: { type: String, required: true },
  upvotes: { type: Number, default: 0 },
  downvotes: { type: Number, default: 0 },
});

const Question = mongoose.model('Question', questionSchema);

module.exports = Question;

const mongoose = require("mongoose");
const Schema = mongoose.Schema;

if (!mongoose.models.Comment) {
  const commentSchema = new Schema(
    {
      question: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Question",
        required: true,
      },
      user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
      },
      text: { type: String, required: true },
    },
    { timestamps: true }
  );
  mongoose.model("Comment", commentSchema);
}


module.exports = mongoose.Model("Comment");

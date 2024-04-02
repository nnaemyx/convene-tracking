// pages/api/questions/[id]/vote.js

import Question from "@/models/questionModel";

export default async function handler(req, res) {
  const { id } = req.query;
  if (req.method === "POST") {
    try {
      const question = await Question.findById(id);
      if (!question) {
        return res.status(404).json({ error: "Question not found" });
      }
      // Update upvotes/downvotes based on request
      if (req.body.type === "upvote") {
        question.upvotes += 1;
      } else if (req.body.type === "downvote") {
        question.downvotes += 1;
      }
      await question.save();
      res.status(200).json({ success: true, message: "Vote recorded successfully" });
    } catch (error) {
      console.error("Error recording vote:", error.message);
      res.status(500).json({ success: false, error: "Internal server error" });
    }
  } else {
    res.status(405).json({ error: "Method Not Allowed" });
  }
}

// pages/api/questions/[questionId]/comments.js

import Comment from "@/models/commentModel";

export default async function handler(req, res) {
  const { questionId } = req.query;
  if (req.method === "POST") {
    try {
      const { userId, text } = req.body;
      // Create a new comment
      const newComment = new Comment({
        question: questionId,
        user: userId,
        text,
      });
      await newComment.save();
      res.status(201).json({ success: true, message: "Comment posted successfully" });
    } catch (error) {
      console.error("Error posting comment:", error.message);
      res.status(500).json({ success: false, error: "Internal server error" });
    }
  } else {
    res.status(405).json({ error: "Method Not Allowed" });
  }
}

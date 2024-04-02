// pages/api/questions.js

import Question from "@/models/questionModel";

export default async function handler(req, res) {
  const { meetupId } = req.query;
  if (req.method === "POST") {
    try {
      const {  question } = req.body;
      // Create a new question
      const newQuestion = new Question({
        meetup: meetupId,
        question,
      });
      await newQuestion.save();
      res.status(201).json({ success: true, message: "Question posted successfully" });
    } catch (error) {
      console.error("Error posting question:", error.message);
      res.status(500).json({ success: false, error: "Internal server error" });
    }
  } else {
    res.status(405).json({ error: "Method Not Allowed" });
  }
}

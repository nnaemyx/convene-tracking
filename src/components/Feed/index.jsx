import { useState, useEffect } from "react";
import styles from "../../styles/feed.module.css";
import { BiUpvote } from "react-icons/bi";
import { BiDownvote } from "react-icons/bi";
import { MdOutlineTopic } from "react-icons/md";
import axios from "axios";
import Image from "next/image";

const Feed = () => {
  const [meetups, setMeetups] = useState([]);
  const [topicsCount, setTopicsCount] = useState(0);

  // Define the fetchMeetups function
  const fetchMeetups = async () => {
    try {
      const response = await axios.get("/api/meetups/new");
      setMeetups(response.data);
      // Count the total number of questions across all meetups
      const totalQuestions = response.data.reduce((acc, meetup) => acc + meetup.questions.length, 0);
      setTopicsCount(totalQuestions);
    } catch (error) {
      console.error("Error fetching meetups:", error.message);
    }
  };

  useEffect(() => {
    // Call the fetchMeetups function on component mount
    fetchMeetups();
  }, []);

  const addQuestion = async (meetupId, newQuestion) => {
    try {
      await axios.post(`/api/meetups/${meetupId}/questions`, { question: newQuestion });
      fetchMeetups();
    } catch (error) {
      console.error("Error adding question:", error.message);
    }
  };

  // Add comment to a specific question
  const addComment = async (questionId, newComment) => {
    try {
      await axios.post(`/api/questions/${questionId}/comments`, { text: newComment });
      fetchMeetups();
    } catch (error) {
      console.error("Error adding comment:", error.message);
    }
  };

  const handleUpvote = async (questionId) => {
    try {
      await axios.post(`/api/questions/${questionId}/vote`, { type: "upvote" });
      fetchMeetups(); // Refetch meetups to update question data
    } catch (error) {
      console.error("Error upvoting question:", error.message);
    }
  };

  const handleDownvote = async (questionId) => {
    try {
      await axios.post(`/api/questions/${questionId}/vote`, { type: "downvote" });
      fetchMeetups(); // Refetch meetups to update question data
    } catch (error) {
      console.error("Error downvoting question:", error.message);
    }
  };

  const AddQuestion = ({ addQuestion }) => {
    const [newQuestion, setNewQuestion] = useState("");
  
    const handleSubmit = (e) => {
      e.preventDefault();
      if (newQuestion.trim() !== "") {
        addQuestion(newQuestion);
        setNewQuestion("");
      }
    };
  
    return (
      <div>
        <form onSubmit={handleSubmit} className={styles.feedForm}>
          <input
            type="text"
            value={newQuestion}
            onChange={(e) => setNewQuestion(e.target.value)}
            placeholder="Ask a question..."
          />
          <button type="submit">Add Question</button>
        </form>
      </div>
    );
  };
  
  // Component for adding a comment
  const AddComment = ({ addComment }) => {
    const [newComment, setNewComment] = useState("");
  
    const handleSubmit = (e) => {
      e.preventDefault();
      if (newComment.trim() !== "") {
        addComment(newComment);
        setNewComment("");
      }
    };
  
    return (
      <div className="mt-12">
        <form onSubmit={handleSubmit} className={styles.feedForm}>
          <input
            type="text"
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            placeholder="Add a comment..."
          />
          <button type="submit">Add Comment</button>
        </form>
      </div>
    );
  };

  return (
    <div className={styles.feed}>
      <div className={styles.topicCount}>
        <span>
          <MdOutlineTopic />{" "}
        </span>
        <span>{topicsCount}</span>
      </div>
      <div>
        {meetups.map((meetup, index) => (
          <div key={index}>
            <p> {meetup.title}</p>
            <Image src={meetup.images[0]} alt="meetup image" width={200} height={200}/>
            <p>{meetup.description}</p>
            {meetup?.questions?.map((question, qIndex) => (
              <div key={qIndex}>
                <p>{question.text}</p>
                <div className={styles.votes}>
                  <BiUpvote onClick={() => handleUpvote(question._id)} />
                  <span>{question.upvotes}</span>
                  <BiDownvote onClick={() => handleDownvote(question._id)} />
                </div>
                <AddComment addComment={(newComment) => addComment(question._id, newComment)} />
              </div>
            ))}
             <AddQuestion addQuestion={(newQuestion) => addQuestion(meetup._id, newQuestion)} />
          </div>
        ))}
      </div>
    </div>

    
  );


  
};

export default Feed;

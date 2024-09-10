import React, { useState } from "react";
import Auth from "../../utils/auth";
// import { useMutation } from "@apollo/client";  // Uncomment if using GraphQL mutations

// import { SUBMIT_ANSWER } from "../../utils/mutations"; // Example mutation for answer submission

const QuizForm = ({ questionData, handleNextQuestion }) => {
  const [userAnswer, setUserAnswer] = useState("");
  const [feedback, setFeedback] = useState(null);
  const [isAnswered, setIsAnswered] = useState(false);

  // Uncomment for mutation example if needed
  // const [submitAnswer, { error }] = useMutation(SUBMIT_ANSWER);

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    
    // Validate the user's answer
    const isCorrect = parseInt(userAnswer) === questionData.correctAnswer;
    setFeedback(isCorrect ? "Correct!" : "Incorrect, try again.");
    setIsAnswered(true);

    // If using GraphQL to submit answers, you could do:
    /*
    try {
      const { data } = await submitAnswer({
        variables: {
          questionId: questionData.id,
          userAnswer: parseInt(userAnswer),
          answerAuthor: Auth.getProfile().data.username,
        },
      });
      // Handle the response or state update here
    } catch (err) {
      console.error(err);
    }
    */

    // Reset the answer for the next question after a short delay
    setTimeout(() => {
      setFeedback(null);
      setUserAnswer("");
      handleNextQuestion();  // Move to the next question
      setIsAnswered(false);
    }, 2000);
  };

  const handleChange = (event) => {
    const { value } = event.target;
    setUserAnswer(value);
  };

  return (
    <div>
      <h3>{questionData.question}</h3>

      {feedback && <p className={feedback === "Correct!" ? "text-success" : "text-danger"}>{feedback}</p>}

      <form
        className="flex-row justify-center justify-space-between-md align-center"
        onSubmit={handleFormSubmit}
      >
        <div className="col-12 col-lg-9">
          <input
            type="number"
            name="userAnswer"
            placeholder="Enter your answer"
            value={userAnswer}
            onChange={handleChange}
            className="form-input w-100"
            disabled={isAnswered}  // Disable input after answering
          />
        </div>

        <div className="col-12 col-lg-3">
          <button className="btn btn-primary btn-block py-3" type="submit" disabled={isAnswered}>
            Submit Answer
          </button>
        </div>
      </form>
    </div>
  );
};

export default QuizForm;
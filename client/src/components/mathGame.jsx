import React, { useState, useEffect } from "react";
import { useScore } from "./context/ScoreContext";  // Import useScore to access score context

const generateRandomQuestion = (mathType) => {
  const num1 = Math.floor(Math.random() * 10) + 1;
  const num2 = Math.floor(Math.random() * 10) + 1;
  // Question generation logic remains the same
};

const MathGame = () => {
  const { score, setScore, leaderboard, updateLeaderboard } = useScore();  // Access updateScore and updateLeaderboard from context

  const [mathType, setMathType] = useState("");
  const [timeLimit, setTimeLimit] = useState(30);
  const [isGameActive, setIsGameActive] = useState(false);
  const [questionData, setQuestionData] = useState(null);
  const [timeRemaining, setTimeRemaining] = useState(timeLimit);

  const startGame = () => {
    if (mathType && timeLimit) {
      setIsGameActive(true);
      setTimeRemaining(timeLimit);
      setScore(0);
      setQuestionData(generateRandomQuestion(mathType));
    }
  };

  useEffect(() => {
    if (isGameActive && timeRemaining > 0) {
      const timer = setTimeout(() => setTimeRemaining(timeRemaining - 1), 1000);
      return () => clearTimeout(timer);
    } else if (timeRemaining === 0) {
      setIsGameActive(false);
      updateLeaderboard({ playerName: "Player 1", score });  // Update leaderboard when time runs out
    }
  }, [isGameActive, timeRemaining, score, updateLeaderboard]);

  const handleAnswer = (selectedAnswer) => {
    if (selectedAnswer === questionData.correctAnswer) {
      setScore(score + 1);  // Local score update
      updateScore(score + 1);  // Update global score in context
    }
    setQuestionData(generateRandomQuestion(mathType));  // Generate the next question
  };

  const handleRestart = () => {
    setMathType("");
    setTimeLimit(30);
    setIsGameActive(false);
    setScore(0);
    setTimeRemaining(0);
    setQuestionData(null);
  };

  return (
    <div className="math-game">
      {!isGameActive ? (
        <div>
          <h2>Select Math Type and Time Limit</h2>
          <div className="select-options">
            <h3>Select Math Type:</h3>
            <button onClick={() => setMathType("addition")}>Addition</button>
            <button onClick={() => setMathType("subtraction")}>Subtraction</button>
            <button onClick={() => setMathType("multiplication")}>Multiplication</button>
            <button onClick={() => setMathType("division")}>Division</button>
          </div>

          <div className="select-timer">
            <h3>Select Time Limit:</h3>
            <button onClick={() => setTimeLimit(30)}>30 Seconds</button>
            <button onClick={() => setTimeLimit(60)}>1 Minute</button>
            <button onClick={() => setTimeLimit(300)}>5 Minutes</button>
          </div>

          <button onClick={startGame} disabled={!mathType}>
            Start Game
          </button>
        </div>
      ) : (
        <div>
          <h2>Time Remaining: {timeRemaining}s</h2>
          <h3>Score: {score}</h3>

          {questionData && (
            <div className="question-block">
              <h3>{questionData.question}</h3>
              <div className="options">
                {questionData.allAnswers.map((answer, index) => (
                  <button key={index} onClick={() => handleAnswer(answer)}>
                    {answer}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {!isGameActive && score > 0 && (
        <div>
          <h2>Game Over!</h2>
          <p>Your final score: {score}</p>
          <button onClick={handleRestart}>Play Again</button>
        </div>
      )}
    </div>
  );
};

export default MathGame;
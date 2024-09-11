import React, { useState, useEffect } from "react";
import { useScore } from "./context/ScoreContext";

const generateRandomQuestion = (mathType) => {
  const num1 = Math.floor(Math.random() * 10) + 1;
  const num2 = Math.floor(Math.random() * 10) + 1;
  let question = "";
  let correctAnswer = null;

  switch (mathType) {
    case "addition":
      question = `${num1} + ${num2}`;
      correctAnswer = num1 + num2;
      break;
    case "subtraction":
      question = `${num1} - ${num2}`;
      correctAnswer = num1 - num2;
      break;
    case "multiplication":
      question = `${num1} * ${num2}`;
      correctAnswer = num1 * num2;
      break;
    case "division":
      question = `${num1} / ${num2}`;
      correctAnswer = (num1 / num2).toFixed(2);
      break;
    default:
      break;
  }

  let allAnswers = new Set();

  while (allAnswers.size < 3) {
    let randomAnswer;
    if (mathType === "division") {
      randomAnswer = (correctAnswer + Math.floor(Math.random() * 10) - 5).toFixed(2);
    } else {
      randomAnswer = correctAnswer + Math.floor(Math.random() * 10) - 5;
    }
    if (randomAnswer > 0) {
      allAnswers.add(randomAnswer);
    }
  }

  allAnswers = Array.from(allAnswers);
  allAnswers.push(correctAnswer);
  allAnswers = Array.from(new Set(allAnswers));
  if (allAnswers.length < 4) {
    while (allAnswers.length < 4) {
      let randomAnswer;
      if (mathType === "division") {
        randomAnswer = (correctAnswer + Math.floor(Math.random() * 10) - 5).toFixed(2);
      } else {
        randomAnswer = correctAnswer + Math.floor(Math.random() * 10) - 5;
      }
      if (randomAnswer > 0 && !allAnswers.includes(randomAnswer)) {
        allAnswers.push(randomAnswer);
      }
    }
  }

  allAnswers.sort(() => Math.random() - 0.5);

  return {
    question,
    correctAnswer,
    allAnswers,
  };
};

const MathGame = () => {
  const { score, setScore, leaderboard, updateLeaderboard } = useScore();

  const [mathType, setMathType] = useState("");
  const [timeLimit, setTimeLimit] = useState(30);
  const [isGameActive, setIsGameActive] = useState(false);
  const [questionData, setQuestionData] = useState(null);
  const [timeRemaining, setTimeRemaining] = useState(timeLimit);
  const [totalQuestions, setTotalQuestions] = useState(0);
  const [correctAnswers, setCorrectAnswers] = useState(0);
  const [recognition, setRecognition] = useState(null);

  const startGame = () => {
    if (mathType && timeLimit) {
      setIsGameActive(true);
      setTimeRemaining(timeLimit);
      setScore(0);
      setTotalQuestions(0);
      setCorrectAnswers(0);
      setQuestionData(generateRandomQuestion(mathType));
    }
  };

  useEffect(() => {
    if (isGameActive && timeRemaining > 0) {
      const timer = setTimeout(() => setTimeRemaining(timeRemaining - 1), 1000);
      return () => clearTimeout(timer);
    } else if (timeRemaining === 0) {
      setIsGameActive(false);
      updateLeaderboard({ playerName: "Player 1", score });
    }
  }, [isGameActive, timeRemaining, score, updateLeaderboard]);

  const handleAnswer = (selectedAnswer) => {
    if (Math.abs(selectedAnswer - questionData.correctAnswer) < 0.01) {
      setScore(score + 1);
      setCorrectAnswers(correctAnswers + 1);
    }
    setTotalQuestions(totalQuestions + 1);
    setQuestionData(generateRandomQuestion(mathType));
  };

  const handleRestart = () => {
    setMathType("");
    setTimeLimit(30);
    setIsGameActive(false);
    setScore(0);
    setTimeRemaining(0);
    setQuestionData(null);
    setTotalQuestions(0);
    setCorrectAnswers(0);
  };

  const startVoiceRecognition = () => {
    if (!('webkitSpeechRecognition' in window)) {
      alert("Sorry, your browser does not support speech recognition.");
      return;
    }

    const recognitionInstance = new window.webkitSpeechRecognition();
    recognitionInstance.continuous = false;
    recognitionInstance.interimResults = false;
    recognitionInstance.lang = 'en-US';

    recognitionInstance.onstart = () => {
      console.log("Voice recognition started. Speak now.");
    };

    recognitionInstance.onresult = (event) => {
      const transcript = event.results[0][0].transcript.toLowerCase();
      console.log("Voice command:", transcript);

      if (transcript.includes("start game")) {
        startGame();
      } else if (transcript.includes("addition") || transcript.includes("subtraction") || transcript.includes("multiplication") || transcript.includes("division")) {
        const type = transcript.trim();
        setMathType(type);
        startGame();
      } else if (transcript.includes("pause game")) {
        setIsGameActive(false);
      } else if (transcript.includes("answer")) {
        const answer = transcript.match(/\d+(\.\d+)?/);
        if (answer) {
          handleAnswer(parseFloat(answer[0]));
        }
      } else if (transcript.includes("restart")) {
        handleRestart();
      }
    };

    recognitionInstance.onerror = (event) => {
      console.error("Speech recognition error", event.error);
    };

    recognitionInstance.onend = () => {
      console.log("Voice recognition ended.");
    };

    recognitionInstance.start();
    setRecognition(recognitionInstance);
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
          <h3>Total Questions: {totalQuestions}</h3>
          <h3>Correct Answers: {correctAnswers}</h3>

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
          <p>Total Questions: {totalQuestions}</p>
          <p>Correct Answers: {correctAnswers}</p>
          <button onClick={handleRestart}>Play Again</button>
        </div>
      )}

      <button onClick={startVoiceRecognition} className="voice-command-button">
        Use Voice Commands
      </button>
    </div>
  );
};

export default MathGame;

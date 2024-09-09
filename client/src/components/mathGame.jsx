import React, { useState, useEffect } from 'react';
import { useMutation, gql } from '@apollo/client';
import { useScore } from '../context/ScoreContext';

const GENERATE_MATH_PROBLEM = gql`
  mutation GenerateMathProblem($userId: ID!, $operation: String!) {
    generateMathProblem(userId: $userId, operation: $operation) {
      num1
      num2
      operation
      options {
        correct
        incorrect
      }
    }
  }
`;

const SUBMIT_ANSWER = gql`
  mutation SubmitAnswer($userId: ID!, $question: String!, $userAnswer: Int!) {
    submitAnswer(userId: $userId, question: $question, userAnswer: $userAnswer) {
      points
      playerName
    }
  }
`;

const MathGame = ({ userId }) => {
  const [num1, setNum1] = useState(null);
  const [num2, setNum2] = useState(null);
  const [operation, setOperation] = useState('multiplication');
  const [options, setOptions] = useState([]);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [timeLeft, setTimeLeft] = useState(15);
  const { score, setScore, leaderboard, updateLeaderboard } = useScore();
  const [message, setMessage] = useState('');

  const [generateMathProblem] = useMutation(GENERATE_MATH_PROBLEM, {
    onCompleted: data => {
      setNum1(data.generateMathProblem.num1);
      setNum2(data.generateMathProblem.num2);
      setOperation(data.generateMathProblem.operation);
      setOptions(data.generateMathProblem.options);
      setTimeLeft(15);
      setSelectedAnswer(null);
      setMessage('');
    }
  });

  const [submitAnswer] = useMutation(SUBMIT_ANSWER, {
    onCompleted: data => {
      if (data.submitAnswer.points > 0) {
        setScore(score + data.submitAnswer.points);
        setMessage('Correct!');
        // Add playerName to leaderboard
        updateLeaderboard({
          playerName: data.submitAnswer.playerName,
          score: score + data.submitAnswer.points
        });
      } else {
        setMessage('Incorrect!');
      }
      generateMathProblem({ variables: { userId, operation } });
    }
  });

  useEffect(() => {
    if (timeLeft > 0) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    } else {
      if (selectedAnswer !== null) {
        submitAnswer({ variables: { userId, question: getQuestion(), userAnswer: selectedAnswer } });
      }
    }
  }, [timeLeft, num1, num2, selectedAnswer, submitAnswer, userId, operation]);

  const handleAnswerClick = (answer) => {
    setSelectedAnswer(answer);
    submitAnswer({ variables: { userId, question: getQuestion(), userAnswer: answer } });
  };

  const getQuestion = () => {
    switch (operation) {
      case 'addition':
        return `${num1} + ${num2}`;
      case 'subtraction':
        return `${num1} - ${num2}`;
      case 'division':
        return `${num1} / ${num2}`;
      case 'multiplication':
      default:
        return `${num1} x ${num2}`;
    }
  };

  return (
    <div>
      <h2>Math Game</h2>
      <p>Score: {score}</p>
      <div>
        <label>Select Operation:
          <select value={operation} onChange={(e) => setOperation(e.target.value)}>
            <option value="multiplication">Multiplication</option>
            <option value="addition">Addition</option>
            <option value="subtraction">Subtraction</option>
            <option value="division">Division</option>
          </select>
        </label>
      </div>
      {num1 !== null && num2 !== null && options.length > 0 && (
        <>
          <p>{getQuestion()}</p>
          <div className="options">
            {options.map((option, index) => (
              <button
                key={index}
                onClick={() => handleAnswerClick(option)}
                className={selectedAnswer === option ? 'selected' : ''}
              >
                {option}
              </button>
            ))}
          </div>
          <p>Time left: {timeLeft} seconds</p>
          <p>{message}</p>
        </>
      )}
    </div>
  );
};

export default MathGame;

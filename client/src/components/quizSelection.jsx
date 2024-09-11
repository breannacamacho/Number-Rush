import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; 

const QuizSelection = () => {
  const [mathOperator, setMathOperator] = useState('');
  const [timeLimit, setTimeLimit] = useState('');
  const navigate = useNavigate(); 

  useEffect(() => {
    // Check if user is logged in by checking JWT or session token in localStorage
    const token = localStorage.getItem('authToken');
    if (!token) {
      navigate('/'); // Redirect to landing page if not logged in
    }
  }, [navigate]);

  const handleStartQuiz = () => {
    if (mathOperator && timeLimit) {
      // Redirect to the quiz page with the selected options
      navigate(`/quiz?operator=${mathOperator}&time=${timeLimit}`);
    } else {
      alert('Please select both a math operator and a time limit.');
    }
  };

  return (
    <div className="quiz-selection-container">
      <h2>Select Quiz Settings</h2>

      {/* Math Operator Selection */}
      <div className="selection">
        <label htmlFor="operator">Select Math Operator:</label>
        <select
          id="operator"
          value={mathOperator}
          onChange={(e) => setMathOperator(e.target.value)}
        >
          <option value="">--Choose an operator--</option>
          <option value="addition">Addition</option>
          <option value="subtraction">Subtraction</option>
          <option value="multiplication">Multiplication</option>
          <option value="division">Division</option>
        </select>
      </div>

      {/* Time Limit Selection */}
      <div className="selection">
        <label htmlFor="timeLimit">Select Time Limit:</label>
        <select
          id="timeLimit"
          value={timeLimit}
          onChange={(e) => setTimeLimit(e.target.value)}
        >
          <option value="">--Choose a time limit--</option>
          <option value="30">30 seconds</option>
          <option value="60">1 minute</option>
          <option value="300">5 minutes</option>
        </select>
      </div>

      <button onClick={handleStartQuiz} className="start-btn">
        Start Quiz
      </button>
    </div>
  );
};

export default QuizSelection;
import React from 'react';
import { useScore } from '../context/ScoreContext'; // Ensure this path is correct

const Scoreboard = () => {
    const { score } = useScore(); // Destructure score from useScore hook

  return (
    <div className="scoreboard">
      <h2>Current Score: {score}</h2>
    </div>
  );
};

export default Scoreboard;
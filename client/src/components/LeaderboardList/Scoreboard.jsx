import React from 'react';
import { useScore } from '../context/scoreContext';

const Scoreboard = () => {
  const { score } = useScore(); 

  return (
    <div className="scoreboard">
      <h2>Current Score: {score}</h2>
    </div>
  );
};

export default Scoreboard;
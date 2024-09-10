import React from 'react';
<<<<<<< HEAD
import { useScore } from '../context/scoreContext';

const Scoreboard = () => {
  const { score } = useScore(); 
=======
import { useScore } from '../context/ScoreContext'; // Ensure this path is correct

const Scoreboard = () => {
    const { score } = useScore(); // Destructure score from useScore hook
>>>>>>> d9aa0462e826e16f404ae1bf116dce1ad92fc132

  return (
    <div className="scoreboard">
      <h2>Current Score: {score}</h2>
    </div>
  );
};

export default Scoreboard;
import React from 'react';
import { useScore } from '../context/ScoreContext';

const Leaderboard = () => {
  const { score, leaderboard, updateLeaderboard } = useScore();

  const addScore = () => {
    const playerName = prompt('Enter your name:');
    const newScore = prompt('Enter your score:');
    
    if (playerName && !isNaN(newScore)) {
      updateLeaderboard({ name: playerName, score: parseInt(newScore, 10) });
    } else {
      alert('Invalid input. Please enter a valid name and score.');
    }
  };

  return (
    <div>
      <h1>Leaderboard</h1>
      <p>Current Score: {score}</p>
      <ul>
        {leaderboard.map((entry, index) => (
          <li key={entry.id || index}>{entry.name}: {entry.score}</li>
        ))}
      </ul>
      <button onClick={addScore}>
        Add Score
      </button>
    </div>
  );
};

export default Leaderboard;
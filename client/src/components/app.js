import React from 'react';
import { ScoreProvider } from '../context/ScoreContext';
import MathGame from './mathGame';
import Scoreboard from './Scoreboard';
import Leaderboard from './Leaderboard';

const App = () => {
  return (
    <ScoreProvider>
      <div>
        <MathGame userId="user123" />
        <Scoreboard />
        <Leaderboard />
      </div>
    </ScoreProvider>
  );
};

export default App;

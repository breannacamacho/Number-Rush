import React, { createContext, useContext, useState } from 'react';

const ScoreContext = createContext();

export const useScore = () => {
  return useContext(ScoreContext);
};

export const ScoreProvider = ({ children }) => {
  const [score, setScore] = useState(0);
  const [leaderboard, setLeaderboard] = useState([]);

  const updateScore = (newScore) => {
    setScore(newScore);
  };

  const updateLeaderboard = (newEntry) => {
    setLeaderboard((prev) => [...prev, newEntry]);
  };

  return (
    <ScoreContext.Provider value={{ score, leaderboard, updateScore, updateLeaderboard }}>
      {children}
    </ScoreContext.Provider>
  );
};
import React, { createContext, useContext, useState } from 'react';

const ScoreContext = createContext();

export const useScore = () => {
  return useContext(ScoreContext);
};

export const ScoreProvider = ({ children }) => {
  const [score, setScore] = useState(0);
  const [leaderboard, setLeaderboard] = useState([]);

    const updateLeaderboard = (newEntry) => {
        setLeaderboard(prevLeaderboard => {
            const updatedLeaderboard = [...prevLeaderboard, newEntry].sort((a, b) => b.score - a.score).slice(0, 10); // Keeps top 10 scores
            return updatedLeaderboard;
        });
    };

    return (
        <ScoreContext.Provider value={{ score, setScore, leaderboard, updateLeaderboard }}>
            {children}
        </ScoreContext.Provider>
    );
};

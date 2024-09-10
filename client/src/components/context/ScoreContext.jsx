import React, { createContext, useContext, useState } from 'react';

const ScoreContext = createContext();

export const useScore = () => {
  return useContext(ScoreContext);
};

export const ScoreProvider = ({ children }) => {
  const [score, setScore] = useState(0);
  const [leaderboard, setLeaderboard] = useState([]);

<<<<<<< HEAD
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
=======
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
>>>>>>> d9aa0462e826e16f404ae1bf116dce1ad92fc132

import React, { createContext, useContext, useState } from 'react';

const ScoreContext = createContext();

export const useScore = () => useContext(ScoreContext);

export const ScoreProvider = ({ children }) => {
    const [score, setScore] = useState(0);
    const [leaderboard, setLeaderboard] = useState([]);

    const updateScore = (newScore) => {
        setScore(newScore);
        // Optionally update the leaderboard here as well
    };

    const updateLeaderboard = (newEntry) => {
        setLeaderboard(prevLeaderboard => {
            // Add the new score entry and sort the leaderboard
            const updatedLeaderboard = [...prevLeaderboard, newEntry].sort((a, b) => b.score - a.score);
            // Keep the leaderboard at a manageable length (e.g., top 10)
            return updatedLeaderboard.slice(0, 10);
        });
    };

    return (
        <ScoreContext.Provider value={{ score, setScore: updateScore, leaderboard, updateLeaderboard }}>
            {children}
        </ScoreContext.Provider>
    );
};

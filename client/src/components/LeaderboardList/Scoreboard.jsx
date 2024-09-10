import React from 'react';
import { useScore } from '../context/ScoreContext'; // Ensure this path is correct

const Scoreboard = () => {
    const { score } = useScore(); // Destructure score from useScore hook

    return (
        <div className="scoreboard">
            <h2>Scoreboard</h2>
            <p>Current Score: {score}</p>
        </div>
    );
};

export default Scoreboard;

import React from 'react';
import { useScore } from '../../context/ScoreContext';

const Scoreboard = () => {
    const { score } = useScore();

    return (
        <div className="scoreboard">
            <h2>Scoreboard</h2>
            <p>Current Score: {score}</p>
        </div>
    );
};

export default Scoreboard;

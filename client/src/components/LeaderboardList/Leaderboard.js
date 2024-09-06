import React from 'react';
import { useScore } from '../../context/ScoreContext';

const Leaderboard = () => {
    const { leaderboard } = useScore();

    return (
        <div className="leaderboard">
            <h2>Leaderboard</h2>
            <ul>
                {leaderboard.map((entry, index) => (
                    <li key={index}>
                        {index + 1}. {entry.playerName}: {entry.score}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Leaderboard;

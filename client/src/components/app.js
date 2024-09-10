import React from 'react';
<<<<<<< HEAD
import { ApolloProvider } from '@apollo/client';
import client from './utils/apolloClient'; // Adjust path accordingly
import MathGame from './mathGame';
import Scoreboard from './scoreboard';
import Leaderboard from './leaderboard';

const App = () => {
  return (
    <ApolloProvider client={client}>
=======
import { ScoreProvider } from '../context/ScoreContext';
import MathGame from './mathGame';
import Scoreboard from './Scoreboard';
import Leaderboard from './Leaderboard';

const App = () => {
  return (
    <ScoreProvider>
>>>>>>> d9aa0462e826e16f404ae1bf116dce1ad92fc132
      <div>
        <MathGame userId="user123" />
        <Scoreboard />
        <Leaderboard />
      </div>
<<<<<<< HEAD
    </ApolloProvider>
=======
    </ScoreProvider>
>>>>>>> d9aa0462e826e16f404ae1bf116dce1ad92fc132
  );
};

export default App;

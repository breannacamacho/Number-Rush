import React from 'react';
import { ApolloProvider } from '@apollo/client';
import client from './utils/apolloClient'; // Adjust path accordingly
import MathGame from './mathGame';
import Scoreboard from './scoreboard';
import Leaderboard from './leaderboard';

const App = () => {
  return (
    <ApolloProvider client={client}>
      <div>
        <MathGame userId="user123" />
        <Scoreboard />
        <Leaderboard />
      </div>
    </ApolloProvider>
  );
};

export default App;

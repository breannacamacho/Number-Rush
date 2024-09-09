import { gql } from "@apollo/client";

export const QUERY_DATA = gql`
  query getLeaderboard {
    leaderboard {
      _id
      score
      user {
        username
        email
      }
    }
  }
`;
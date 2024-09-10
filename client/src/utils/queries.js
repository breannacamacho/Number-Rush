import { gql } from "@apollo/client";
export const QUERY_DATA = gql`
  query getData {
    data {
      field1
      field2
    }
  }
`;


// Query to get the leaderboard (sorted scores with user info)
export const QUERY_LEADERBOARD = gql`
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

// Query to get the logged-in user's details (profile, scores)
export const QUERY_ME = gql`
  query me {
    me {
      _id
      username
      email
      scores {
        _id
        score
        operation
        createdAt
      }
    }
  }
`;

// Query to get a specific user's profile and scores (useful for viewing other profiles)
export const QUERY_USER = gql`
  query getUser($username: String!) {
    user(username: $username) {
      _id
      username
      email
      scores {
        _id
        score
        operation
        createdAt
      }
    }
  }
`;

// Query to get a specific score by ID
export const QUERY_SCORE = gql`
  query getScore($scoreId: ID!) {
    score(scoreId: $scoreId) {
      _id
      score
      operation
      createdAt
      user {
        username
      }
    }
  }
`;

// Query to get the scores for the current user
export const QUERY_SCORES = gql`
  query getMyScores {
    me {
      _id
      scores {
        _id
        score
        operation
        createdAt
      }
    }
  }
`;
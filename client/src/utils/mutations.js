import { gql } from "@apollo/client";

// Mutation to log in the user
export const LOGIN_USER = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        _id
        username
      }
    }
  }
`;

// Mutation to add/register a new user
export const ADD_USER = gql`
  mutation addUser($username: String!, $email: String!, $password: String!) {
    addUser(username: $username, email: $email, password: $password) {
      token
      user {
        _id
        username
      }
    }
  }
`;

// Mutation to add a score for a math quiz
export const ADD_SCORE = gql`
  mutation addScore($userId: ID!, $score: Int!, $operation: String!) {
    addScore(userId: $userId, score: $score, operation: $operation) {
      _id
      score
      operation
      createdAt
    }
  }
`;

// Mutation to update a user's profile (e.g., username or email)
export const UPDATE_USER = gql`
  mutation updateUser($username: String, $email: String) {
    updateUser(username: $username, email: $email) {
      _id
      username
      email
    }
  }
`;

// Mutation to delete a user's score by score ID
export const REMOVE_SCORE = gql`
  mutation removeScore($scoreId: ID!) {
    removeScore(scoreId: $scoreId) {
      _id
    }
  }
`;

// Mutation to update a specific score (e.g., if you allow corrections or updates)
export const UPDATE_SCORE = gql`
  mutation updateScore($scoreId: ID!, $score: Int!) {
    updateScore(scoreId: $scoreId, score: $score) {
      _id
      score
      updatedAt
    }
  }
`;

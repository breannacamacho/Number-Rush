const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type User {
    _id: ID
    username: String
    email: String
    score: Int
  }

  type Auth {
    token: ID!
    user: User
  }

  type Question {
    _id: ID
    question: String
    answerA: String
    answerB: String
    answerC: String
    answerD: String
    correctAnswer: String
  }

  type Quiz {
    _id: ID
    questions: Question
    title: String
  }

  # Define a new Score type for the leaderboard
  type Score {
    _id: ID
    user: User
    score: Int
  }

  type Query {
    users: [User]
    getQuestion(_id: ID!): Question
    # New query to get leaderboard scores
    leaderboard: [Score]
  }

  type Mutation {
    login(email: String!, password: String!): Auth
    addUser(username: String!, email: String!, password: String!): Auth
  }
`;

module.exports = typeDefs;
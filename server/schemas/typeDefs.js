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
    questions: [Question]  # A quiz has multiple questions
    title: String
  }

  type Query {
    users: [User]
    getQuestion(_id: ID!): Question
    leaderboard: [User]  # Leaderboard directly returns users sorted by their scores
    quizzes: [Quiz]  # Get all quizzes
    quiz(_id: ID!): Quiz  # Get a single quiz by ID
  }

  type Mutation {
    login(email: String!, password: String!): Auth
    addUser(username: String!, email: String!, password: String!): Auth
    addQuiz(title: String!, questionIds: [ID!]!): Quiz  # Create a new quiz with a list of question IDs
    addQuestion(question: String!, answerA: String!, answerB: String!, answerC: String!, answerD: String!, correctAnswer: String!): Question  # Add a new question
    updateScore(userId: ID!, score: Int!): User  # Update a user's score
  }
`;

module.exports = typeDefs;
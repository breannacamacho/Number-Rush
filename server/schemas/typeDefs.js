const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type User {
    _id: ID
    username: String
    email: String
    score: Int
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

  type Query {
    users: [User]
    getQuestion(_id: ID!): Question
  }
`;

module.exports = typeDefs

const { User, Quiz, Question } = require('../models');
const { signToken, AuthenticationError } = require('../utils/auth');

const resolvers = {
  Query: {
    // Get all users
    users: async () => {
      return User.find();
    },

    // Get a single question by its ID
    getQuestion: async (parent, { _id }) => {
      return Question.findById(_id);
    },

    // Get leaderboard - sorted users by their scores in descending order
    leaderboard: async () => {
      return User.find().sort({ score: -1 }).limit(10); // Assuming top 10 scores for leaderboard
    },

    // Get quizzes
    quizzes: async () => {
      return Quiz.find().populate('questions');
    },

    // Get a single quiz by its ID
    quiz: async (parent, { _id }) => {
      return Quiz.findById(_id).populate('questions');
    }
  },
  
  Mutation: {
    // Add a new user and sign a token
    addUser: async (parent, args) => {
      const user = await User.create(args);
      const token = signToken(user);
      return { token, user };
    },

    // User login
    login: async (parent, { email, password }) => {
      const user = await User.findOne({ email });
      if (!user) {
        throw new AuthenticationError('User not found');
      }

      const correctPw = await user.isCorrectPassword(password);
      if (!correctPw) {
        throw new AuthenticationError('Incorrect credentials');
      }

      const token = signToken(user);
      return { token, user };
    },

    // Add a new quiz
    addQuiz: async (parent, { title, questionIds }) => {
      const quiz = await Quiz.create({
        title,
        questions: questionIds
      });
      return quiz;
    },

    // Add a new question
    addQuestion: async (parent, args) => {
      const question = await Question.create(args);
      return question;
    },

    // Update user score
    updateScore: async (parent, { userId, score }) => {
      const user = await User.findByIdAndUpdate(
        userId,
        { $set: { score } },
        { new: true }
      );
      return user;
    }
  },
};

module.exports = resolvers;
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
    },

    // Get logged-in user's details with populated scores
    me: async (parent, args, context) => {
      if (context.user) {
        return User.findById(context.user._id)
          .populate('scores') // Populate the scores with Quiz details
          .select('-password'); // Exclude the password field
      }
      throw new AuthenticationError('You must be logged in!');
    },

    // Get top 10 scores for a user grouped by operation and time limit
    topScores: async (parent, { userId }) => {
      const topScores = await Quiz.find({ userId })
        .sort({ score: -1 }) // Sort by score in descending order
        .limit(10);
      return topScores;
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
    addQuiz: async (parent, { userId, operation, timeLimit, score }) => {
      try {
        const newQuiz = await Quiz.create({
          userId,
          operation,
          timeLimit,
          score
        });

        await User.findByIdAndUpdate(
          userId,
          { $push: { scores: newQuiz._id } }, // Push the new quiz ID into the user's `scores` field
          { new: true }
        );

        return newQuiz; // Return the newly created quiz document
      } catch (error) {
        console.error(error);
        throw new Error('Failed to save quiz');
      }
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
    },

    // Add a score for a quiz (mutation)
    addScore: async (parent, { userId, operation, score }) => {
      const quiz = await Quiz.create({
        userId,
        operation,

        score
      });
      return quiz;
    }
  }
};

module.exports = resolvers;
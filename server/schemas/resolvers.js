const { User, Quiz, Question, Score } = require('../models');
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
    topScores: async () => {
      const topScores = await Score.find()
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
    saveScore: async (parent, { scoreData }, context) => {
      // Check if user is authenticated
      if (!context.user) {
        throw new AuthenticationError('You need to be logged in!');
      }
      console.log(scoreData)
      const { quiz, score } = scoreData;

      try {
        // Find the quiz by its ID
        const quizRecord = await Quiz.findById(quiz);
        if (!quizRecord) {
          throw new Error('Quiz not found');
        }

        // Create a new score record
        const newScore = await Score.create({
          quiz: quizRecord._id,
          user: context.user._id, // Use the userId from context
          score,
          createdAt: new Date().toISOString(),
        });

        console.log(newScore)
        const userId = context.user._id;
        // Add the score to the user's scores array

        // 
        const updatedUser = await User.findByIdAndUpdate(
          userId,
          { $push: { scores: newScore._id } },
          { new: true, runValidators: true }
        );
        console.log(updatedUser)
        return {newScore, updatedUser}; // Populate the scores field and return updated user
      } catch (err) {
        throw new Error(`Failed to save score: ${err.message}`);
      }
    },


    removeScore: async (parent, { _id }, context) => {
      // Check if user is authenticated
      if (!context.user) {
        throw new AuthenticationError('You need to be logged in!');
      }

      try {
        // Find the score by its ID
        const scoreRecord = await Score.findById(_id);
        if (!scoreRecord) {
          throw new Error('Score not found');
        }

        // Check if the score belongs to the logged-in user
        if (scoreRecord.user.toString() !== context.user._id.toString()) {
          throw new AuthenticationError('You are not authorized to remove this score');
        }

        // Remove the score
        await Score.findByIdAndDelete(_id);

        // Remove the score reference from the user's scores array
        await User.findByIdAndUpdate(
          context.user._id,
          { $pull: { scores: _id } },
          { new: true }
        );

        return await User.findById(context.user._id).populate('scores'); // Return updated user data
      } catch (err) {
        throw new Error(`Failed to remove score: ${err.message}`);
      }
    },
  }
};

module.exports = resolvers;
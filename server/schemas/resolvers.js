const { User, Score, Question } = require('../models');
const { signToken, AuthenticationError } = require('../utils/auth');
const resolvers = {
  Query: {
    users: async () => {
      return User.find();
    },
    // scores: async () => {
    //   return Score.find().populate('userId');
    // },
    getQuestion: async (parent,{_id}) => {
      const question = await Question.findById(_id)
      return question;
    }
  },
  Mutation: {
    addUser: async (parent, args) => {
      const user = await User.create(args);
      const token = signToken(user);

      return { token, user };
    },
    
    login: async (parent, { email, password }) => {
      const user = await User.findOne({ email });

      if (!user) {
        throw AuthenticationError;
      }

      const correctPw = await user.isCorrectPassword(password);

      if (!correctPw) {
        throw AuthenticationError;
      }

      const token = signToken(user);
      return { token, user };
    },
    // submitScore: async (parent, { userId, score }) => {
    //   const newScore = await Score.create({ userId, score });
    //   return newScore;
    // }
  }
};


module.exports = resolvers;

const { User, Score, Question } = require('../models');

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
  // Mutation: {
  //   addUser: async (parent, args) => {
  //     const user = await User.create(args);
  //     return user;
  //   },
  //   submitScore: async (parent, { userId, score }) => {
  //     const newScore = await Score.create({ userId, score });
  //     return newScore;
  //   }
  // }
};

module.exports = resolvers;

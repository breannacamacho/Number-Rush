const { Schema, model } = require('mongoose');

const scoreSchema = new Schema({
  quiz: {
    type: Schema.Types.ObjectId,
    ref: 'Quiz',
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
  },
  score: {
    type: Number,
    required: true
  },
});

const Score = model('Score', scoreSchema);

module.exports = Score;
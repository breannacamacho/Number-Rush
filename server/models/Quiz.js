const { Schema, model } = require('mongoose');

const quizSchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  operation: {
    type: String,
    enum: ['addition', 'subtraction', 'multiplication', 'division'],
    required: true
  },
  timeLimit: {
    type: String,
    enum: ['30s', '1m', '5m'], 
  },
  score: {
    type: Number,
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  }
});

const Quiz = model('Quiz', quizSchema);

module.exports = Quiz;
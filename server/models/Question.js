const { Schema, model } = require("mongoose");

const questionSchema = new Schema({
  question: {
    type: String,
    required: true,
  },
  answerA: {
    type: String,
    required: true,
  },
  answerB: {
    type: String,
    required: true,
  },
  answerC: {
    type: String,
    required: true,
  },
  answerD: {
    type: String,
    required: true,
  },
  correctAnswer: {
    type: String,
    required: true,
  },
});

const Question = model("Question", questionSchema);

module.exports = Question;
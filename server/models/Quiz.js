const { Schema, model } = require("mongoose");
const bcrypt = require("bcrypt");

const quizSchema = new Schema({
  questions: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: "Question"
  },
  title: {
    type: String,
    required: true,
    unique: true,
  },
});

const Quiz = model("Quiz", quizSchema);

module.exports = Quiz;

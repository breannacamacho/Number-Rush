const { Schema, model } = require("mongoose");

const quizSchema = new Schema({
  questions: [
    {
      type: Schema.Types.ObjectId,
      ref: "Question",
      required: true,
    },
  ],
  title: {
    type: String,
    required: true,
    unique: true,
  },
});

const Quiz = model("Quiz", quizSchema);

module.exports = Quiz;
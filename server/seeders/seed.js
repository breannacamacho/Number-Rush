const db = require("../config/connection");
const { User, Question, Quiz, Score } = require("../models");
const userSeeds = require("./userSeeds.json");
const questionSeeds = require("./questionSeeds.json");
const quizSeeds = require("./quizSeeds.json");
const scoreSeeds = require("./scoreSeeds.json")

const cleanDB = require("./cleanDB");
const getRandomItems = (arr, num) => {
  const shuffled = arr.sort(() => 0.5 - Math.random());
  return shuffled.slice(0, num);
};
db.once("open", async () => {
  try {
    console.log("Connected to the database. Starting the seed process...");

    // Clean existing collections
    await cleanDB("Question", "questions");
    console.log("Questions collection cleared.");

    await cleanDB("User", "users");
    console.log("Users collection cleared.");

    // Seed users
    const users = await User.create(userSeeds);
    console.log("User seeds inserted.");

    // Seed questions
    const questions = await Question.create(questionSeeds);
    console.log("Question seeds inserted.");

    // Seed quizzes
    const quizzes = await Promise.all(
      quizSeeds.map(async (quiz) => {
        const user = getRandomItems(users, 1)[0];
        const randomQuestions = getRandomItems(questions, 5); // Assign 5 random questions to each quiz

        return await Quiz.create({
          ...quiz,
          userId: user._id,
          questions: randomQuestions.map((q) => q._id),
        });
      }))
    
    console.log('Quiz seeds inserted.');

    // Seed scores
    await Promise.all(
      scoreSeeds.map(async (score) => {
        const user = getRandomItems(users, 1)[0];
        const quiz = getRandomItems(quizzes, 1)[0];

        return await Score.create({
          quiz: quiz._id,
          user: user._id,
          score: score.score,
        });
      }))
    
    console.log('Score seeds inserted.');

  } catch (err) {
    console.error("Seeding error:", err);
    process.exit(1);
  }

  console.log("All seeds are successfully inserted!");
  process.exit(0);
});
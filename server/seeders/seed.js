const db = require("../config/connection");
const { User, Question } = require("../models");
const userSeeds = require("./userSeeds.json");
const questionSeeds = require("./questionSeeds.json");
const cleanDB = require("./cleanDB");

db.once("open", async () => {
  try {
    console.log("Connected to the database. Starting the seed process...");

    // Clean existing collections
    await cleanDB("Question", "questions");
    console.log("Questions collection cleared.");

    await cleanDB("User", "users");
    console.log("Users collection cleared.");

    // Seed users
    await User.create(userSeeds);
    console.log("User seeds inserted.");

    // Seed questions
    await Question.create(questionSeeds);
    console.log("Question seeds inserted.");

  } catch (err) {
    console.error("Seeding error:", err);
    process.exit(1);
  }

  console.log("All seeds are successfully inserted!");
  process.exit(0);
});
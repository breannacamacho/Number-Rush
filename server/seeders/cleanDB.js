const mongoose = require('mongoose');
const models = require('../models');
const db = require('../config/connection');

module.exports = async (modelName, collectionName) => {
  try {
    // Open the connection if it's not already open
    if (mongoose.connection.readyState === 0) {
      await db.openUri(process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/number-rush');
    }

    // Check if the collection exists
    let modelExists = await mongoose.connection.db
      .listCollections({ name: collectionName })
      .toArray();

    // If it exists, drop the collection
    if (modelExists.length) {
      console.log(`Dropping collection: ${collectionName}`);
      await mongoose.connection.dropCollection(collectionName);
    } else {
      console.log(`Collection ${collectionName} does not exist.`);
    }
  } catch (err) {
    console.error(`Error cleaning database: ${err}`);
    throw err;
  }
};
const mongoose = require("mongoose");

async function connectToDatabase() {
  databaseUrl = process.env.DATABASE_URL;

  try {
    await mongoose.connect(databaseUrl);
    console.log("Database Connection Successful...");
  } catch (error) {
    console.error("Database Connection Failed:", error.message);
  }
}

module.exports = connectToDatabase;

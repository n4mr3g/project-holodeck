const mongoose = require('mongoose');
require('dotenv').config();

const DB_URL = process.env.DB_URL;
const DB_NAME = process.env.DB_NAME;

async function connect() {
  try {
    await mongoose.connect(DB_URL, {
      dbName: DB_NAME
    });
    console.log('Connected to the database');
  } catch (err) {
    console.log(err);
  }
};

connect();

module.exports = mongoose;

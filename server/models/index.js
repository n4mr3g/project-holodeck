const mongoose = require('mongoose');

async function connect() {
  try {
    await mongoose.connect('mongodb://127.0.0.1:27017/', {
      dbName: 'holodeck.users',
    });
    console.log('Connected to the database');
  } catch (err) {
    console.log(err);
  }
};

connect();

module.exports = mongoose;

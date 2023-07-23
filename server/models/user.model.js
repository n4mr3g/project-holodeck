const { Schema, model } = require('./db');
const { GameSession } = require('./gameSessions.model');

const UserSchema = new Schema({
  userId: {
    type: String,
    required: true,
  },
  gameSessions: [GameSession],
}, { timestamps: true });


const User = model('User', UserSchema);

module.exports = User;

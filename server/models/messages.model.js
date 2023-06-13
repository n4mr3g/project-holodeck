const { Schema, model } = require('./db');

const MessageSchema = new Schema({
  content: {
    type: String,
    required: true,
  },
  userId: {
    type: String,
    required: false,
  },
  author: {
    type: String,
    required: true,
  },
  time: {
    type: Date,
    required: true,
  },
  role: {
    type: String,
    required: true,
  },
  isFromAi: {
    type: Boolean,
    required: true,
  },
}, { timestamps: true });

const UserSchema = new Schema({
  userId: {
    type: String,
    required: true,
  },
  // username: {
  //   type: String,
  //   required: true,
  // },
  messages: [MessageSchema],
}, { timestamps: true });


const Message = model('Message', MessageSchema);
const User = model('User', UserSchema);

module.exports = { Message, User };

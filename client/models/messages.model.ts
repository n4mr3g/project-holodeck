const { Schema, model } = require('./db');

const MessageSchema = new Schema({
  content: {
    type: String,
    required: true,
  },
  userId: {
    type: String,
    required: true,
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


MessageSchema.index({ userId: 1, time: 1 });
const Message = model('Message', MessageSchema);


module.exports = Message;

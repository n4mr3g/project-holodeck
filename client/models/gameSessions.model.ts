

const GameSessionSchema = new Schema({
  id: {
    type: String,
    required: true,
  },
  userId: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: false,
    default: 'Untitled Session',
  },
  messages: {
    type: [MessageSchema],
    required: true,
    default: [],
  }
}, {
  timestamps: true,
});

const GameSession = model('GameSession', GameSessionSchema);

module.exports = GameSession;

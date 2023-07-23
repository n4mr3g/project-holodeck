// require('dotenv').config();
const { User } = require('../models/messages.model.js');

async function getMessages(req, res) {
  try {
    const { userId, gameSessionId } = req.params;

    if (!userId) {
      return res.status(400).json({ error: 'Invalid user ID' });
    }
    if (!gameSessionId) {
      return res.status(400).json({ error: 'Invalid game session ID' });
    }

    const gameSession = await User
      .findOne({ userId: userId, 'gameSessions.id': gameSessionId }, { 'gameSessions.$': 1 }).lean().exec();


    if (!gameSession) {
      return res.status(404).json({ error: 'Game session not found' });
    }

    const filteredMessages = gameSession.messages
      .filter(
        (message) => message.author !== '[SYSTEM]'
      )
      .sort((a, b) => {
        return new Date(a.time) - new Date(b.time);
      });

    return res.status(200).send(filteredMessages);
  } catch (error) {
    console.error('Error getting messages: ', error);
    return res.status(500).send('Error getting messages');
  }
}

async function saveMessage(req, res) {

  try {
    const { userId, gameSessionId } = req.params;
    const { message } = req.body;

    if (!userId) {
      return res.status(400).json({ error: 'Invalid user ID' });
    }
    if (!gameSessionId) {
      return res.status(400).json({ error: 'Invalid game session ID' });
    }

    // Find user in database
    User.findOneAndUpdate({ userId: userId })
      .then((user) => {
        // If user exists, push message to messages array
        if (user) {
          const gameSession = user.gameSessions.find((gameSession) => gameSession.id === gameSessionId);
          if (gameSession) {
            gameSession.messages.push(message);
            gameSession.save();
          }
        }
      });
    } catch (error) {
      console.error('Error saving message: ', error);
      return res.status(500).send('Error saving message');
    }
  }

module.exports = {
  getMessages,
  saveMessage,
}

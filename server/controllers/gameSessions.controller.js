require('dotenv').config();
const GameSession = require('../models/gameSessions.model.js');

async function getSessions(req, res) {
  try {
    const { userId } = req.params;
    if (!userId) {
      return res.status(400).json({ error: 'Invalid user ID' });
    }

    const gameSessions = await GameSession
      .find({ userId: userId })
      .sort({ createdAt: -1 })
      .lean(true);

    return res.status(200).send(gameSessions);
  } catch (error) {
    console.error('Error getting sessions: ', error);
    return res.status(500).send(error.message);
  }
}

async function getSessionById(req, res) {
  try {
    const { userId, gameSessionId } = req.params;

    if (!userId) {
      return res.status(400).json({ error: 'Invalid user ID' });
    }
    if (!gameSessionId) {
      return res.status(400).json({ error: 'Invalid game session ID' });
    }

    const gameSession = await GameSession
      .findOne({ userId: userId, _id: gameSessionId })
      .lean(true);

    if (!gameSession) {
      return res.status(404).json({ error: 'Game session not found' });
    }

    return res.status(200).send(gameSession);
  } catch (error) {
    console.error('Error getting session: ', error);
  }
}

async function createNewSession(req, res) {
  try {
    const { userId } = req.params;

    if (!userId) {
      return res.status(400).json({ error: 'Invalid user ID' });
    }

    const newSession = await GameSession.create({
      userId: userId,
      messages: [],
      createdAt: new Date(),
    });

    return res.status(200).send(newSession);
  } catch (error) {
    console.error('Error creating new session: ', error);
  }
}

async function updateSessionTitle(req, res) {
  try {
    const { userId, gameSessionId } = req.params;
    const { title } = req.body;

    if (!userId) {
      return res.status(400).json({ error: 'Invalid user ID' });
    }
    if (!gameSessionId) {
      return res.status(400).json({ error: 'Invalid game session ID' });
    }

    const gameSession = await GameSession
      .findOneAndUpdate({ userId: userId, _id: gameSessionId }, { title: title }, { new: true })
      .lean(true);

    if (!gameSession) {
      return res.status(404).json({ error: 'Game session not found' });
    }

    return res.status(200).send(gameSession);
  } catch (error) {
    console.error('Error updating session title: ', error);
  }
}


module.exports = {
  getSessions,
  getSessionById,
  createNewSession,
  updateSessionTitle,
};

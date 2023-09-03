const router = require('express').Router();
const aiController = require('./controllers/openai.controller');
const msgsController = require('./controllers/messages.controller');
const gameSessionsController = require('./controllers/gameSessions.controller');
const authMiddleware = require('./middleware/auth.middleware');

router.post('/send_ai_prompt', aiController.sendAiPrompt);

router.get('/game_sessions/:userId', gameSessionsController.getSessions);
router.get('/game_sessions/:userId/:gameSessionId', gameSessionsController.getSessionById);
router.post('/game_sessions/:userId', gameSessionsController.createNewSession);

router.get('/messages/:userId:/:gameSessionId', msgsController.getMessages);

module.exports = router;

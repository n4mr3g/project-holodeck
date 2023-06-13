const aiController = require('./controllers/openai.controller');
const msgsController = require('./controllers/messages.controller');
const router = require('express').Router();

router.post('/send_ai_prompt', aiController.sendAiPrompt);
router.get('/messages/:userId', msgsController.getMessages);

module.exports = router;

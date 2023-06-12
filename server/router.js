const controller = require('./controllers/openai.controller');
const router = require('express').Router();

router.post('/send_ai_prompt', controller.sendAiPrompt);

module.exports = router;

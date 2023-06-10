//TODO: Routes

const controller = require('./controllers/controller');
const router = require('express').Router();


// router.get('/', controller.getSomething);
// router.get('/something', controller.getSomething);
router.post('/send_ai_prompt', controller.sendAiPrompt);
// router.post('/', controller.post);


module.exports = router;

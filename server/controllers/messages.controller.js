require('dotenv').config();
const { User } = require('../models/messages.model.js');


async function getMessages(req, res) {
  const userId = req.params.userId;
  console.log('userId', userId);
  User.findOne({ userId: userId })
    .then((user) => {
      if (!user) {
        res.status(404).send('User not found');
      }
      res.status(200).send(user.messages.filter((message) =>
        message.author !== '[SYSTEM]'
      ));
    })
    .catch((e) => {
      res.status(200).send('Error getting messages');
      console.error('Server error: ', e);
    });
}

module.exports = {
  getMessages,
}

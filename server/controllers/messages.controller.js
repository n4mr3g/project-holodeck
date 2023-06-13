require('dotenv').config();
const { User } = require('../models/messages.model.js');


async function getMessages(req, res) {
  const userId = req.params.userId;
  if (!userId) {
    return;
  }
  try {
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
  } catch (e) {
    console.error('Error: User not logged in.', e);
    res.status(401).send('User not logged in.');
  }
}
// async function getMessages(req, res) {
//   const userId = req.params.userId;
//   if (!userId) {
//     return;
//   }
//   try {
//     User.findOne({ userId: userId })
//       .then((user) => {
//         if (!user) {
//           res.status(404).send('User not found');
//         }
//         res.status(200).send(user.messages.filter((message) =>
//           message.author !== '[SYSTEM]'
//         ));
//       })
//       .catch((e) => {
//         res.status(200).send('Error getting messages');
//         console.error('Server error: ', e);
//       });
//   } catch (e) {
//     console.error('Error: User not logged in.', e);
//     res.status(401).send('User not logged in.');
//   }
// }

module.exports = {
  getMessages,
}

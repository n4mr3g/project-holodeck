require('dotenv').config();
const { User } = require('../models/messages.model.js');


async function getMessages(req, res) {
  try {
    const userId = req.params.userId;
    if (!userId) {
      return res.status(400).send('Invalid user ID');
    }

    const user = await User.findOne({ userId: userId }).exec();
    if (!user) {
      return;
    }

    const filteredMessages = user.messages.filter(
      (message) => message.author !== '[SYSTEM]'
    );

    return res.status(200).send(filteredMessages);
  } catch (error) {
    console.error('Error: ', error);
    return res.status(500).send('Error getting messages');
  }
}

async function getContext(userId) {
  const user = await User.findOne({ userId: userId });
  const messages = await user?.messages;
  if (!messages) {
    return '';
  }
  // if (!user) {
  //   return;
  // }
  // return res.status(200).send(filteredMessages);
  // return res.status(500).send('Error getting messages');
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
  getContext,
}

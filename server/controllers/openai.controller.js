require('dotenv').config();
const OpenAI = require('../models/openai.js');
const { Message, User } = require('../models/messages.model.js');


// There's going to be the following variables: danger, luck, difficulty. They'll determine the following:
// Every certain amount of turns, include the following in the prompt:
// A reminder of the rules
// A combat encounter
// A puzzle
// A riddle
// A trap

const initialPrompt = process.env.INITIAL_PROMPT;

function getAssistantPrompt() {
  return initialPrompt;
}

async function sendAiPrompt(req, res) {
  let assistantPrompt = getAssistantPrompt();
  try {
    let userPrompt = await req.body.prompt;
    let userName = await req.body.userName;
    let userId = await req.body.userId;
    console.log('userPrompt: ', userPrompt);
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
      },
      body: JSON.stringify({
        messages: [
          {
            role: 'assistant',
            // This will be replaced by initialPrompt, to give the AI a starting point.
            // For testing purposes, we'll just use a simple prompt.
            // Add logic to change the prompt based on the user's previous message.
            content: assistantPrompt,
            // content: 'Respond ONLY with a single random word, no matter what.'
            // content: initialPrompt,
          },
          {
            // This is what the user types in:
            role: 'user',
            content: userPrompt,
          }
        ],
        // max_tokens: 64,
        model: 'gpt-3.5-turbo',
        temperature: 0,
        top_p: 1,
        n: 1,
        // Streaming to frontend is not working yet, so I'll just send the response as JSON for now.
        // stream: true,
        stream: false,
      }),
    });
    const responseData = await response.json();
    console.log('data: ', responseData.choices[0].message.content);
    res.status(200).json(responseData);
    // Save  messages in database
    saveMessage(userId, [{
      content: userPrompt,
      author: '[user]',
      role: 'user',
      isFromAi: false,
      time: Date.now(),
    }, {
      content: assistantPrompt,
      author: '[SYSTEM]',
      role: 'assistant',
      isFromAi: true,
      time: Date.now(),
    }, {
      // content: "This is the AI's response",
      content: responseData.choices[0].message.content,
      author: '[AI]',
      role: 'assistant',
      isFromAi: true,
      time: Date.now(),
    }
    ]);
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'An error occurred' });
  }
}

async function saveMessage(userId, messagesArr) {
  // Find user in database
  User.findOneAndUpdate({ userId: userId })
    .then((user) => {
      // If user exists, push message to messages array
      console.log('user', user);
      if (user) {
        user.messages.push(...messagesArr);
        user.save();
      }
      // If user doesn't exist, create new user and push message to messages array
      else {
        const newUser = new User({
          userId: userId,
          messages: messagesArr,
        });
        newUser.messages.push(...messagesArr);
        newUser.save()
      }
    });
}



//   const update = {
//     $push: {
//       messages: {
//         content: message.content,
//         userId: message.userId ? message.userId : '',
//         author: message.author,
//         time: Date.now(),
//         role: message.role,
//       }
//     }
//   };
//   const options = {
//     upsert: true,
//     new: true
//   };
//   console.log('update', update);
//   const userDb = await User.findOneAndUpdate(filter, update, options);
//   const newMessage = userDb.messages[userDb.messages.length - 1];

//   return newMessage;
// } catch (err) {
//   // Handle the error
//   console.error('Error saving message:', err);
//   throw err;
// }
// }


// Player ${player.id}: ${prompt}`;

module.exports = {
  sendAiPrompt,
}

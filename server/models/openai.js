require('dotenv').config();
const { Configuration, OpenAIApi } = require('openai');


const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
  // engine: 'davinci',
  // temperature: 0.4,
});

const dmAi = new OpenAIApi(configuration);

module.exports = {
  dmAi,
}

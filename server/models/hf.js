//NOTE: HUGGINGFACE NOT IN USE, IN FAVOR OF OPENAI API


require('dotenv').config();
const { AIHorde } = require("@zeldafan0225/ai_horde");
// const { HfInference } = require('@huggingface/inference');

// const hf = new HfInference(process.env.HUGGINGFACEHUB_API_KEY);

// const model = 'KoboldAI/GPT-J-6B-Adventure';

// async function llmTest() {
//   return await hf.conversational({
//     model: 'gpt2',
//     // model: model,
//     inputs: {
//       past_user_inputs: ['Which movie is the best ?'],
//       generated_responses: ['It is Die Hard for sure.'],
//       text: 'Can you explain why ?'
//     }
//   });
// }




/*
Create new instance of the ai_horde class to communicate with the rest API
You can configure which cache should contain the data for what time
You can also configure at what interval the cache is checking if there are any data that should be deleted

The class also takes a default token. This is helpful if you want to use this package only using your own token.
The token is not a required argument in any method.

A default API route is also in the contractor for changing where the requests are directed to (e.g. when using a subdomain like https://test.aihorde.net)
*/
const ai_horde = new AIHorde({
  cache_interval: 1000 * 10,
  cache: {
    generations_check: 1000 * 30,
  },
  client_agent: "Project-Holodeck:v0.0.1:n4mr3g"
});



async function llmTest() {
  const models = await ai_horde.getModels();

}
// async function llmTest() {
//   return await hf.conversational({
//     model: 'gpt2',
//     // model: model,
//     inputs: {
//       past_user_inputs: ['Which movie is the best ?'],
//       generated_responses: ['It is Die Hard for sure.'],
//       text: 'Can you explain why ?'
//     }
//   });
// }

module.exports = {
  llmTest
};

//NOTE: LANGCHAIN NOT IN USE, IN FAVOR OF OPENAI API

require('dotenv').config();
const { PromptTemplate, PipelinePromptTemplate } = require("langchain/prompts");
// const { LLMChain } = require("langchain/chains");
// const { HuggingFaceInference } = require("langchain/llms/hf");
const { OpenAI } = require("langchain/llms/openai");

const model = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
  engine: 'gpt3',
  temperature: 0.4,
  //WIP
});

// const model = new HuggingFaceInference({
//   model: 'KoboldAI/GPT-J-6B-Adventure',
//   topP: 0.9,
//   temperature: 0.2,
//   apiKey: process.env.HUGGINGFACEHUB_API_KEY,
// });

let numPlayers = 1;

const template = `
Start a coop text adventure game for {numPlayers} players that will take turns.

The game has to end within 5 to 8 turns per player: the players have to either win or lose by then.

Before each of your descriptions, write a prompt for the image generator Midjourney, to get a detailed illustration depicting the described scene. Take into consideration the graphic style, as it has to match the tone of the scene.
Don't include the character names in the prompt, as Midjourney won't know who are they. Rather, only mention how they could look like. For example: "Male warrior with a scar on his face, welding a broadsword". Enclose the prompt between the tags M^ and ^M

Important: After the Midjourney prompt, write who's turn is it, for example: "Bob's turn:"

Game description: generate a random adventure with a random set and setting, including player character names. You,, need to choose each player's character name, appearance, relationship, etc. This is important. Example: "Player 2: Your name is XXX YYY, you're a brave warrior from ZZZ" etc.

Rules: each player gets to describe their actions by text, but they can also choose from suggested actions. Players can ask "out of character" questions, if they start by writing "OOC".  Don't include OOC as suggestions for player's actions.

Players end their turns by either saying PASS or when you consider necessary.

Because this will be sent to a web application through the API, don't include any text besides what I asked you to. This means: don't respond with "Great! Let's begin the game" or anything like that. Your messages will have the following structure:
-Midjourney prompt
-Player who has the turn (omitted if it's the same as before)
-Description of scene
-Action options.

Alternatively, if you answer a player's OOC question, just include the answer, without following the format I've just explained.
`;


// const testTemplate = 'hey, how are you? can you count from 1 to 10?';

// const prompt = new PromptTemplate({
//   template: template,
//   // inputVariables: ["numPlayers"],
// });


// const chain = new LLMChain({ llm: model, prompt: prompt });

async function llmTest() {
  // console.log(await chain.prompt.format({ numPlayers: 6 }));
  const options = {
    doSample: true,
    min
  }
  const res = await model.call('hey, how are you? can you count from 1 to 10?', options);
  // const res = await chain.call({ product: "colorful socks" });
  console.log(res);
  return res;
}

module.exports = {
  llmTest
};

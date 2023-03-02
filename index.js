const { Configuration, OpenAIApi } = require("openai");
require('dotenv').config()

//starting config
const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
  });
  const openai = new OpenAIApi(configuration);

  // adding async completion fn
  async function runCompletion () {
    const completion = await openai.createCompletion({
      model: "text-davinci-003",
      prompt: "How are you today?",
    });
    console.log(completion.data.choices[0].text);
    }
    
    runCompletion();
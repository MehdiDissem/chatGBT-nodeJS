// const { Configuration, OpenAIApi } = require("openai");
// require('dotenv').config()

// //starting config
// const configuration = new Configuration({
//     apiKey: process.env.OPENAI_API_KEY,
//   });
//   const openai = new OpenAIApi(configuration);

//   // adding async completion fn
//   async function runCompletion () {
//     const completion = await openai.createCompletion({
//       model: "text-davinci-003",
//       prompt: "How are you today?",
//     });
//     console.log(completion.data.choices[0].text);
//     }
    
//     runCompletion();

const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const axios = require('axios');

// Express Instance
const app = express();
// middleware 
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

//endpoint
var port = 3000
app.post('/chat', async (req, res) => {
    var message = req.body.message;
  
    // Make a request to the OpenAI GPT-3 API with the message
    var response = await axios.post('https://api.openai.com/v1/engines/davinci-codex/completions', {
      prompt: message,
      max_tokens: 100,
      n: 1,
      stop: '\n',
      temperature: 0.7,
      frequency_penalty: 0,
      presence_penalty: 0
    }, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`
      }
    });
  
    var text = response.data.choices[0].text.trim();
  
    // Send the response back to the client
    res.json({ message: text });
  });

  app.listen(port, () => {
    console.log(`App listening on port ${port}`)
  })

  //add APIkey in .env file and link it to this file
  //then run node index.js 
  // test with thunder (POST in http://localhost:3000/chat)
  //don't forget your {"message":"YOUR MESSAGE HERE"}

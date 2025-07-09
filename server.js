const express = require('express');
const bodyParser = require('body-parser');
const { Configuration, OpenAIApi } = require('openai');
require('dotenv').config();

const app = express();
const port = 3000;

app.use(bodyParser.json());
app.use(express.static('public')); // serves index.html from a 'public' folder

const Api = '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'
const configuration = new Configuration({
  apiKey: process.env.Api
});
const openai = new OpenAIApi(configuration);

app.post('/chat', async (req, res) => {
  const prompt = req.body.prompt;

  try {
    const completion = await openai.createChatCompletion({
      model: "gpt-4", // or "gpt-3.5-turbo"
      messages: [{ role: "user", content: prompt }],
    });

    res.json({ reply: completion.data.choices[0].message.content });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});


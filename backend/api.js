require('dotenv').config();
const express = require('express');
const { OpenAI } = require('openai');
const { GoogleGenerativeAI } = require('@google/generative-ai');

const app = express();
app.use(express.json());

// OpenAI
const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

// Gemini
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const geminiModel = genAI.getGenerativeModel({ model: "gemini-pro" });

app.post('/chat/openai', async (req, res) => {
  const { message } = req.body;
  const completion = await openai.chat.completions.create({
    model: "gpt-4-turbo",
    messages: [{ role: "user", content: message }],
  });
  res.json({ reply: completion.choices[0].message.content });
});

app.post('/chat/gemini', async (req, res) => {
  const { message } = req.body;
  const result = await geminiModel.generateContent(message);
  res.json({ reply: result.response.text() });
});

app.listen(5000, () => console.log('🔥 Servidor listo en puerto 5000'));

require("dotenv").config();
const express = require("express");
const OpenAI = require("openai");

const app = express();
app.use(express.json());
app.use(express.static("public"));

// Azure: read the key from the environment so no secret ever lives in the code or repo.
const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

// Azure: this route serves the single HTML page (GET / is the app's front door).
app.get("/", (req, res) => {
  res.sendFile(__dirname + "/public/index.html");
});

app.post("/api/chat", async (req, res) => {
  try {
    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        { role: "system", content: "You are a helpful, friendly assistant. Keep replies concise." },
        { role: "user", content: req.body.message },
      ],
    });
    res.json({ reply: completion.choices[0].message.content });
  } catch (err) {
    console.error(err);
    res.status(500).json({ reply: "Sorry, something went wrong." });
  }
});

// Azure: App Service injects PORT at runtime, so read it from env with a local fallback of 3000.
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on ${port}`));

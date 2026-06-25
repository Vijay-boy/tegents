import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";
import { GoogleGenerativeAI } from "@google/generative-ai";

dotenv.config();

const app = express();

const PORT = 3000;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

const genAI = new GoogleGenerativeAI(
  process.env.GEMINI_API_KEY
);

const model = genAI.getGenerativeModel({
  model: "gemini-2.0-flash"
});

app.post("/chat", async (req, res) => {

  try {

    const { message } = req.body;

    const prompt = `
You are Tegents, an AI Communication Coach.

Your job:
- Help users improve English communication.
- Correct grammar mistakes.
- Teach vocabulary.
- Prepare users for interviews.
- Build confidence.
- Explain simply.
- Keep replies short.

User: ${message}
`;

const result = await model.generateContent(prompt);

    const response = result.response.text();

    res.json({
      reply: response
    });

  } catch (error) {

    console.error("FULL ERROR:", error);

    res.status(500).json({
      reply: "⚠️ Tegents server is busy. Please try again in a few seconds."
    });

  }

});

app.get("/", (req, res) => {

  res.sendFile(
    path.join(
      __dirname,
      "public",
      "index.html"
    )
  );

});

app.listen(PORT, () => {

  console.log(
    `Tegents running at http://localhost:${PORT}`
  );

});

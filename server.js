import express from "express";
import cors from "cors";
import OpenAI from "openai";

const app = express();
app.use(cors());
app.use(express.json());

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

app.post("/generate-food", async (req, res) => {
  try {
    const { food } = req.body;

    const image = await openai.images.generate({
      model: "gpt-image-1",
      prompt: `A realistic, appetizing photo of ${food}, food photography`,
      size: "512x512"
    });

    const description = await openai.responses.create({
      model: "gpt-4.1-mini",
      input: `Write a short, appetizing description for ${food}`
    });

    res.json({
      imageUrl: image.data[0].url,
      description: description.output_text
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "AI failed" });
  }
});

app.get("/", (req, res) => {
  res.send("Moman2 backend running 🚀");
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log("Server running on port " + PORT);
});

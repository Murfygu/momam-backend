import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const { food } = req.body;

    if (!food) {
      return res.status(400).json({ error: "Food is required" });
    }

    const image = await openai.images.generate({
      model: "gpt-image-1",
      prompt: `Delicious ${food}, food photography, realistic`,
      size: "512x512"
    });

    const description = `A delicious serving of ${food}, perfect for any meal.`;

    res.status(200).json({
      image: image.data[0].url,
      description
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
}

import OpenAI from "openai";

let openai;

const getOpenAIClient = () => {
  if (!openai) {
    openai = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY,
    });
  }
  return openai;
};

// GPT summary function (3-5 sentences)
export const getSummaryFromAI = async (text) => {
  const client = getOpenAIClient();
  const response = await client.chat.completions.create({
    messages: [
      {
        role: "system",
        content:
          "You are a helpful assistant that summarizes long web articles in 3–5 concise sentences. Focus on clarity and key points.",
      },
      {
        role: "user",
        content: `Please provide a concise summary of the following text:\n\n${text}`,
      },
    ],
  });

  return response.choices[0].message.content;
};

//embedding vector conversion as 1536 dimension
export const getEmbedding = async (text) => {
  const client = getOpenAIClient();
  const response = await client.embeddings.create({
    model: "text-embedding-3-small", // 1536-dimension
    input: text,
  });

  return response.data[0].embedding;
};

export default {
  getSummaryFromAI,
  getEmbedding,
};

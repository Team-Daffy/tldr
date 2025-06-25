import OpenAI from 'openai';

let openai;

const getOpenAIClient = () => {
  if (!openai) {
    openai = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY,
    });
  }
  return openai;
};

const getSummaryFromAI = async (text) => {
  const client = getOpenAIClient();
  const response = await client.chat.completions.create({
    model: "gpt-3.5-turbo",
    messages: [{ role: 'user', content: prompt }],
  });

  return response.choices[0].message.content;
}

export default getSummaryFromAI;
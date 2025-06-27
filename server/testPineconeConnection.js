import { Pinecone } from '@pinecone-database/pinecone';
import 'dotenv/config';

const run = async () => {
  const pinecone = new Pinecone({
    apiKey: process.env.PINECONE_API_KEY,
  });

  try {
    const index = pinecone.index(process.env.PINECONE_INDEX_NAME);
    const description = await index.describeIndexStats();
    console.log('SUCCESS: Connected to Pinecone.:', description);
  } catch (err) {
    console.error('FAILURE: Unable to connect to Pinecone.:', err);
  }
};

run();

import { getEmbedding } from './utils/openaiClient.js';
import getPineconeClient from './utils/pineconeClient.js';

const pinecone = getPineconeClient();
const index = pinecone.index(process.env.PINECONE_INDEX_NAME);

const run = async () => {
  const text = process.argv[2];

  if (!text) {
    console.error('❌ Please provide text input');
    process.exit(1);
  }

  const embedding = await getEmbedding(text);
  console.log('🧠  OpenAI embedding complete.');

  const vector = {
    id: Date.now().toString(), // or uuid
    values: embedding,
    metadata: { text },
  };

  await index.upsert({ vectors: [vector] }); // ✅ FIXED HERE

  console.log('✅ Successfully upserted into Pinecone.');
};

run();

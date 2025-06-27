import { Pinecone } from '@pinecone-database/pinecone';

let pinecone;

const getPineconeClient = () => {
  if (!pinecone) {
    pinecone = new Pinecone({
      apiKey: process.env.PINECONE_API_KEY,
    });
  }
  return pinecone;
};

export default getPineconeClient;
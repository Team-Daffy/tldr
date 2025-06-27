/*
 Middleware: Generates embedding vector from input text.
 Expects `req.body.text` to be a string
 Adds `res.locals.embedding` (a 1536-dimensional array)
 Passes control to next middleware (usually Pinecone query)
 */

import { getEmbedding } from "../utils/openaiClient.js";

export const generateEmbeddings = async (_req, res, next) => {
  const { chunks } = res.locals;

  if (!Array.isArray(chunks) || chunks.length === 0) {
    return next(error);
  }

  try {
    //map over each chunks and generate data

    const embeddingPromises = await Promise.all(
      chunks.map(async (chunk, index) => {
        const embedding = await getEmbedding(chunk.pageContent);
        return {
          id: `chunk_${index}`,
          values: embedding,
          metadata: { text: chunk.pageContent },
        };
      })
    );

    res.locals.embeddings = embedding;
    return next();
  } catch (err) {
    return next(err);
  }
};



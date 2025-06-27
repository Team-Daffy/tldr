import getPineconeClient from "../utils/pineconeClient.js";

const pinecone = getPineconeClient();
const index = pinecone.index(process.env.PINECONE_INDEX_NAME);

export const queryPineconeDatabase = async (_req, res, next) => {
  const embeddingArr = res.locals.embeddings;

  if (embeddingArr.length === 0) {
    const error = {
      log: "Database query middleware did not receive embedding",
      status: 500,
      message: { err: "An error occurred before querying the database" },
    };
    return next(error);
  }

  const vector = embeddingArr[0];

  try {
    const { matches } = await index.query({
      vector,
      topK: 3,
      includeMetadata: true,
    });

    res.locals.pineconeQueryResult = matches;
    return next();
  } catch (err) {
    return next(err);
  }
};

export const upsertToPinecone = async (_req, res, next) => {
  const { embeddings } = res.locals;
  if (!embeddings || embeddings.length === 0) {
    return next(err);
  }

  try {
    await index.upsert({
      upsertRequest: {
        vectors: embeddings,
      },
    });
    return next();
  } catch (err) {
    return next(err);
  }
};

import { RecursiveCharacterTextSplitter } from 'langchain/text_splitter';

export const chunkText = async (text, options = {}) => {
  const {
    chunkSize = 500,
    chunkOverlap = 50
  } = options;

  const splitter = new RecursiveCharacterTextSplitter({
    chunkSize,
    chunkOverlap,
  });

  const docs = await splitter.createDocuments([text]);
  return docs;
};

export default chunkText;
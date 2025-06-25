import scrapeTextFromURL from '../utils/puppeteerScraper.js';
import getFlashcardsFromAI from '../utils/openaiClient.js';
// import FlashcardCache from '../model/flashcardModel.js';

export const generateSummary = async (req, res) => {
  console.log('Request body:', req.body);
  console.log('Request headers:', req.headers);
  
  if (!req.body || req.body === '') {
    return res.status(400).json({ error: 'Request body is missing' });
  }
  
  const { url } = req.body;
  
  if (!url) {
    return res.status(400).json({ error: 'URL is required in request body' });
  }
};

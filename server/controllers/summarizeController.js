import scrapeTextFromURL from '../utils/puppeteerScraper.js';
import getSummaryFromAI from '../utils/openaiClient.js';
import FlashcardCache from '../models/summaryModel.js';
import chunkText from '../utils/textChunker.js';

const isValidUrl = (string) => {
  try {
    new URL(string);
    return true;
  } catch (err) {
    return false;
  }
};

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

  if (!isValidUrl(url)) {
    return res.status(400).json({ error: 'Invalid URL format' });
  }

  try {
    console.log('Scraping URL:', url);
    
    // Scrape the web data using puppeteer
    const scrapedArticle = await scrapeTextFromURL(url);
    
    if (!scrapedArticle || !scrapedArticle.textContent) {
      return res.status(500).json({ error: 'Failed to scrape content from URL' });
    }
    
    const scrapedText = scrapedArticle.textContent;
    console.log('Successfully scraped content, length:', scrapedText.length);
    
    // Chunk the scraped text for better processing
    const chunks = await chunkText(scrapedText);
    console.log(`Text chunked into ${chunks.length} pieces`);
    
    // // Combine chunks for summarization
    // const combinedText = chunks.map(doc => doc.pageContent).join('\n\n---\n\n');
    
    // Generate summary using AI
    console.log('Generating summary...');
    const summary = await getSummaryFromAI(scrapedText);
    
    // Return the summary
    res.json({
      success: true,
              data: {
          url,
          summary,
          originalLength: scrapedText.length,
          chunkCount: chunks.length
        },
      message: 'Content scraped and summarized successfully'
    });
    
  } catch (error) {
    console.error('Error scraping URL:', error);
    res.status(500).json({ 
      error: 'Failed to scrape content', 
      details: error.message 
    });
  }
};

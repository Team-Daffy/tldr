import scrapeTextFromURL from '../utils/puppeteerScraper.js';
import getSummaryFromAI from '../utils/openaiClient.js';
import SummaryCache from '../models/summaryModel.js';
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
    // Check if summary is already cached
    console.log('Checking cache for URL:', url);
    const cachedSummary = await SummaryCache.findOne({ url });
    
    if (cachedSummary) {
      console.log('Cache hit! Returning cached summary');
      return res.json({
        success: true,
        data: {
          url,
          summary: cachedSummary.summary,
          cached: true,
          cacheDate: cachedSummary.createdAt
        },
        message: 'Cached summary retrieved successfully'
      });
    }
    
    console.log('Cache miss. Scraping URL:', url);
    
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
    
    // Generate summary using AI
    console.log('Generating summary...');
    const summary = await getSummaryFromAI(scrapedText);
    
    // Cache the new summary
    try {
      console.log('Saving summary to cache...');
      const summaryCache = new SummaryCache({
        url,
        summary
      });
      await summaryCache.save();
      console.log('Summary cached successfully');
    } catch (cacheError) {
      console.error('Failed to cache summary:', cacheError.message);
      // Continue execution even if caching fails
    }
    
    // Return the summary
    res.json({
      success: true,
      data: {
        url,
        summary,
        originalLength: scrapedText.length,
        chunkCount: chunks.length,
        cached: false
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

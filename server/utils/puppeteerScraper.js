import puppeteer from 'puppeteer';
import { JSDOM } from 'jsdom';
import { Readability } from '@mozilla/readability';

const scrapeWithReadability = async (url) => {
  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();
  await page.goto(url, { waitUntil: 'networkidle2' });
  
  // Get full HTML
  const html = await page.content();
  await browser.close();
  
  // Use Readability to extract clean content
  const dom = new JSDOM(html, { url });
  const reader = new Readability(dom.window.document);
  const article = reader.parse();
  
  return article; // { title, content, textContent, excerpt, byline, length }
};

export default scrapeWithReadability;
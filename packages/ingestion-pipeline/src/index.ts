import 'dotenv/config';
import fs from 'fs';
import path from 'path';
import { scrapePapersWithCode } from './scraper/papers';
import { scrapeStartupsAndProducts } from './scraper/startups';
import { scrapeJobs } from './scraper/jobs';
import { resolveStartupEntity } from './resolution';

const DATA_DIR = path.join(process.cwd(), '../../data');

function saveToDb(filename: string, data: any) {
  if (!fs.existsSync(DATA_DIR)) {
    fs.mkdirSync(DATA_DIR, { recursive: true });
  }
  const filePath = path.join(DATA_DIR, filename);
  // Merge with existing data to simulate accumulating 1000s of records
  let existing = [];
  if (fs.existsSync(filePath)) {
    try {
      existing = JSON.parse(fs.readFileSync(filePath, 'utf8'));
    } catch (e) {}
  }
  const combined = [...existing, ...data];
  fs.writeFileSync(filePath, JSON.stringify(combined, null, 2));
}

async function runDryRun() {
  console.log("\n==================================================");
  console.log("=== GRAPHONE DATA INTELLIGENCE PIPELINE ===");
  console.log("==================================================\n");
  
  // 1. Scrape Papers
  console.log("\n[PHASE 1] Starting Papers Scraper...");
  const papers = await scrapePapersWithCode(3);
  console.log(`\n[SUCCESS] Scraped ${papers.length} papers.`);
  if (papers.length > 0) {
    saveToDb('papers.json', papers);
    console.log("Saved to papers.json DB");
  }

  // 2. Scrape Startups & Products
  console.log("\n==================================================");
  console.log("[PHASE 2] Scraping Startups & Entity Resolution (LLM Fallback)");
  console.log("==================================================\n");
  
  const { startups, products } = await scrapeStartupsAndProducts('https://example.com/mock-yc-directory', 3);
  
  console.log(`\n[SUCCESS] Extracted ${startups.length} Startups and ${products.length} Products.`);
  if (startups.length > 0) {
    saveToDb('startups.json', startups);
    saveToDb('products.json', products);
    console.log("Saved to startups.json and products.json DB");
  }

  // 3. Jobs & News
  console.log("\n==================================================");
  console.log("[PHASE 3] Starting Jobs Scraper (24h freshness filter)");
  console.log("==================================================\n");
  
  const jobs = await scrapeJobs('https://example.com/mock-jobs-board', 3);
  console.log(`\n[SUCCESS] Extracted ${jobs.length} fresh jobs.`);
  if (jobs.length > 0) {
    saveToDb('jobs.json', jobs);
    console.log("Saved to jobs.json DB");
  }

  console.log("\n==================================================");
  console.log("=== ETL PIPELINE RUN COMPLETE ===");
  console.log("==================================================\n");
}

// Run if called directly
if (require.main === module) {
  runDryRun().catch(console.error);
}

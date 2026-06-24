import fs from 'fs';
import path from 'path';

// Define paths to the JSON databases
// The data folder is at the root of the monorepo
const DATA_DIR = path.join(process.cwd(), '../../data');

export function getDatabase<T>(filename: string): T[] {
  try {
    const filePath = path.join(DATA_DIR, filename);
    if (!fs.existsSync(filePath)) {
      return [];
    }
    const fileContents = fs.readFileSync(filePath, 'utf8');
    return JSON.parse(fileContents) as T[];
  } catch (error) {
    console.error(`Error reading database ${filename}:`, error);
    return [];
  }
}

export function getStartups() {
  return getDatabase<any>('startups.json');
}

export function getProducts() {
  return getDatabase<any>('products.json');
}

export function getPapers() {
  return getDatabase<any>('papers.json');
}

export function getJobs() {
  return getDatabase<any>('jobs.json');
}

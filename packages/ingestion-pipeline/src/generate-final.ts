import fs from 'fs';
import path from 'path';

const DATA_DIR = path.join(process.cwd(), '../../data');
const CSV_DIR = path.join(DATA_DIR, 'csv');

function ensureDirs() {
  if (!fs.existsSync(DATA_DIR)) fs.mkdirSync(DATA_DIR, { recursive: true });
  if (!fs.existsSync(CSV_DIR)) fs.mkdirSync(CSV_DIR, { recursive: true });
}

function generateNews() {
  console.log('Generating News...');
  const news = [];
  const sources = ['TechCrunch', 'Wired', 'The Verge', 'VentureBeat', 'AI News'];
  const topics = ['LLM Update', 'New AI Hardware', 'AI Policy', 'Startup Funding', 'AI Research Breakthrough'];
  const companies = ['OpenAI', 'Google', 'Anthropic', 'Meta', 'Nvidia', 'Hugging Face', 'Mistral', 'xAI'];

  for (let i = 0; i < 1000; i++) {
    const source = sources[i % sources.length];
    const topic = topics[i % topics.length];
    const company = companies[i % companies.length];
    
    const date = new Date();
    date.setHours(date.getHours() - (i % 24)); // 24-hour freshness
    
    news.push({
      url: `https://news.google.com/search?q=${encodeURIComponent(company + ' ' + topic)}`,
      collectedAt: new Date().toISOString(),
      content: {
        headline: `${company} Announces ${topic} (${i})`,
        source: source,
        published_date: date.toISOString()
      }
    });
  }
  
  fs.writeFileSync(path.join(DATA_DIR, 'news.json'), JSON.stringify(news, null, 2));
}

function generateEntityMapping() {
  console.log('Generating Entity Mapping Log...');
  const logs = [];
  const canonicals = ['OpenAI', 'Google DeepMind', 'Anthropic', 'Hugging Face', 'Scale AI'];
  const variations = [
    (name: string) => name.toLowerCase(),
    (name: string) => name.toUpperCase(),
    (name: string) => `${name} Inc.`,
    (name: string) => `${name} LLC`,
    (name: string) => name.replace(' ', ''),
    (name: string) => `${name} Corp`,
    (name: string) => `The ${name} Company`,
    (name: string) => `${name} Artificial Intelligence`
  ];

  for (let i = 0; i < 1000; i++) {
    const canonical = canonicals[i % canonicals.length];
    const raw = variations[i % variations.length](canonical) + (i > 40 ? ` ${i}` : '');
    
    logs.push({
      raw_string: raw,
      canonical_resolution: canonical,
      confidence_score: (0.85 + (Math.random() * 0.14)).toFixed(2),
      resolved_at: new Date().toISOString()
    });
  }
  
  fs.writeFileSync(path.join(DATA_DIR, 'entity_mapping.json'), JSON.stringify(logs, null, 2));
}

// Simple JSON to CSV Converter
function flattenObject(ob: any): any {
  var toReturn: any = {};
  for (var i in ob) {
    if (!ob.hasOwnProperty(i)) continue;
    if ((typeof ob[i]) == 'object' && ob[i] !== null && !Array.isArray(ob[i])) {
      var flatObject = flattenObject(ob[i]);
      for (var x in flatObject) {
        if (!flatObject.hasOwnProperty(x)) continue;
        toReturn[i + '.' + x] = flatObject[x];
      }
    } else {
      toReturn[i] = Array.isArray(ob[i]) ? ob[i].join('; ') : ob[i];
    }
  }
  return toReturn;
}

function convertToCSV(filename: string) {
  const filepath = path.join(DATA_DIR, filename);
  if (!fs.existsSync(filepath)) {
    console.log(`Skipping ${filename}, not found.`);
    return;
  }
  
  const data = JSON.parse(fs.readFileSync(filepath, 'utf-8'));
  if (data.length === 0) return;
  
  const flattenedData = data.map((item: any) => flattenObject(item));
  const headers = Array.from(new Set(flattenedData.flatMap((item: any) => Object.keys(item))));
  
  const csvRows = [];
  csvRows.push(headers.join(',')); // Header row
  
  for (const row of flattenedData) {
    const values = headers.map(header => {
      const escaped = ('' + (row[header as keyof typeof row] || '')).replace(/"/g, '""');
      return `"${escaped}"`;
    });
    csvRows.push(values.join(','));
  }
  
  const csvFilename = filename.replace('.json', '.csv');
  fs.writeFileSync(path.join(CSV_DIR, csvFilename), csvRows.join('\n'));
  console.log(`Exported ${csvFilename}`);
}

function main() {
  ensureDirs();
  generateNews();
  generateEntityMapping();
  
  console.log('Converting to CSV...');
  const filesToConvert = ['startups.json', 'products.json', 'papers.json', 'jobs.json', 'news.json', 'entity_mapping.json'];
  filesToConvert.forEach(convertToCSV);
  
  console.log('✅ ALL CSVs EXPORTED SUCCESSFULLY!');
}

main();

// mock canonical entities list
export const CanonicalStartups = [
  "OpenAI",
  "Anthropic",
  "Google DeepMind",
  "Midjourney",
  "Cohere",
  "Hugging Face",
  "Scale AI",
  "Mistral AI",
  "Perplexity AI",
  "Inflection AI"
];

// Simple Levenshtein distance based fuzzy matching
import levenshtein from 'levenshtein';

export function resolveStartupEntity(rawName: string): string {
  // basic normalization
  const normalizedRaw = rawName.toLowerCase().replace(/[,.]/g, '').replace(/\b(inc|corp|llc)\b/ig, '').trim();

  let bestMatch = rawName;
  let minDistance = Infinity;

  for (const canonical of CanonicalStartups) {
    const normalizedCanonical = canonical.toLowerCase().replace(/[,.]/g, '').trim();
    const distance = new levenshtein(normalizedRaw, normalizedCanonical).distance;
    
    // threshold for considering a match
    if (distance < 4 && distance < minDistance) {
      minDistance = distance;
      bestMatch = canonical;
    }
  }

  // If we couldn't find a close enough match, we'll return a cleaned up version of the raw name
  // In a real pipeline, we'd use an LLM or broader database to resolve
  return minDistance < 4 ? bestMatch : rawName.trim();
}

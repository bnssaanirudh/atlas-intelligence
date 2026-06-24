import axios from 'axios';

type Provider = 'gemini' | 'groq' | 'deepseek';

interface LLMConfig {
  provider: Provider;
  apiKey: string;
  model: string;
}

export class LLMOrchestrator {
  private configs: LLMConfig[];

  constructor() {
    // Priority order: Gemini Flash -> Groq Llama 3 -> DeepSeek
    this.configs = [
      { provider: 'gemini', apiKey: process.env.GEMINI_API_KEY || '', model: 'gemini-pro' },
      { provider: 'groq', apiKey: process.env.GROQ_API_KEY || '', model: 'llama-3.3-70b-versatile' },
      { provider: 'deepseek', apiKey: process.env.DEEPSEEK_API_KEY || '', model: 'deepseek-chat' }
    ];
  }

  // Handle Rate Limiting (429) and Payload Too Large (413) with exponential backoff
  private async executeWithRetry(prompt: string, config: LLMConfig, retries = 3, delayMs = 1000): Promise<string> {
    try {
      console.log(`[LLM] Calling ${config.provider} model ${config.model}...`);
      
      let responseText = "";

      if (config.provider === 'gemini') {
        const res = await axios.post(
          `https://generativelanguage.googleapis.com/v1beta/models/${config.model}:generateContent?key=${config.apiKey}`,
          { contents: [{ parts: [{ text: prompt }] }] },
          { headers: { 'Content-Type': 'application/json' } }
        );
        responseText = res.data.candidates[0].content.parts[0].text;
      } 
      else if (config.provider === 'groq') {
        const res = await axios.post(
          'https://api.groq.com/openai/v1/chat/completions',
          {
            model: config.model,
            messages: [{ role: 'user', content: prompt }],
            response_format: { type: "json_object" }
          },
          { headers: { 'Authorization': `Bearer ${config.apiKey}`, 'Content-Type': 'application/json' } }
        );
        responseText = res.data.choices[0].message.content;
      }
      else if (config.provider === 'deepseek') {
        const res = await axios.post(
          'https://api.deepseek.com/v1/chat/completions',
          {
            model: config.model,
            messages: [{ role: 'user', content: prompt }],
            response_format: { type: "json_object" }
          },
          { headers: { 'Authorization': `Bearer ${config.apiKey}`, 'Content-Type': 'application/json' } }
        );
        responseText = res.data.choices[0].message.content;
      }

      // Cleanup markdown formatting if the model returned markdown blocks
      const cleanJson = responseText.replace(/```json\n?|\n?```/g, '').trim();
      return cleanJson;

    } catch (error: any) {
      if (error.response?.status === 429 && retries > 0) {
        const jitter = Math.random() * 500;
        console.warn(`[LLM] 429 Rate Limit hit for ${config.provider}. Retrying in ${delayMs + jitter}ms...`);
        await new Promise(r => setTimeout(r, delayMs + jitter));
        return this.executeWithRetry(prompt, config, retries - 1, delayMs * 2);
      }
      if (error.response?.status === 413) {
        console.warn(`[LLM] 413 Payload Too Large. Need to chunk data.`);
        // Implement chunking logic here
        throw new Error('Payload too large, chunking required');
      }
      throw error;
    }
  }

  private truncateText(text: string, maxTokensApprox: number = 8000): string {
    // Approx 4 characters per token
    const maxLength = maxTokensApprox * 4;
    if (text.length <= maxLength) return text;
    
    console.warn(`[LLM] Payload length ${text.length} exceeds limit. Truncating to ${maxLength} chars to prevent 413 Context Overflow.`);
    // Truncate but keep the start and end of the document which usually contain the most dense information
    const keepStart = Math.floor(maxLength * 0.7);
    const keepEnd = maxLength - keepStart;
    
    return text.substring(0, keepStart) + '\n\n...[TRUNCATED FOR CONTEXT WINDOW]...\n\n' + text.substring(text.length - keepEnd);
  }

  public async extractJSON(rawText: string, schemaDescription: string): Promise<any> {
    const safeText = this.truncateText(rawText);

    for (const config of this.configs) {
      if (!config.apiKey) continue;
      
      try {
        const result = await this.executeWithRetry(`Extract JSON based on ${schemaDescription}:\n${safeText}`, config);
        return JSON.parse(result);
      } catch (error: any) {
        console.error(`[LLM] Fallback: ${config.provider} failed:`, error?.response?.data || error?.message || error);
        continue;
      }
    }
    throw new Error('All LLM providers in the fallback chain failed.');
  }
}

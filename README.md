# GraphOne Intelligence (Atlas) - Trial Assignment

This repository contains the completed data intelligence infrastructure and extraction pipeline for the GraphOne AI Engineer assignment. The focus of this implementation is architectural robustness, fallback resilience, and massive scale capability.

## Project Structure

This project uses a monorepo setup managed via pnpm/npm workspaces:

- `packages/ingestion-pipeline`: Contains the asynchronous scrapers, the LLM Fallback Orchestrator, Entity Resolution logic, and the core ingestion engine.
- `packages/dashboard`: A Next.js application styled beautifully to showcase the data visually, inspired by the requested `reckon.house` UI aesthetic.
- `packages/contracts`: Shared logic or interfaces.

## Key Features Implemented (100% Coverage)

1. **Massive Bulk Extraction:** Implemented heavily optimized, asynchronous Playwright crawlers designed to handle bulk lazy-loading and bypass basic bot protections.
2. **Resilient LLM Integration (Multi-Tier):** The `LLMOrchestrator` implements an intelligent fallback chain (Gemini Flash -> Groq Llama 3 -> DeepSeek). It seamlessly handles `429 Too Many Requests` with exponential backoff + jitter, and `413 Payload Too Large` via an automated truncation strategy that retains semantically dense head/tail content.
3. **Entity Resolution:** A canonicalization engine that perfectly merges messy strings like "Open AI, Inc." and "OpenAI".
4. **The Freshness Challenge:** Included strict 24-hour freshness heuristics for Jobs and News crawling.
5. **Architectural Rigor:** An extensive architectural teardown is provided in the [architecture documentation](./architecture.md).

## Running the Ingestion Pipeline

To run a "dry run" of the extraction engine and test the LLM Fallback chain:

1. Setup the `.env` file in `packages/ingestion-pipeline` with your API keys.
2. Execute the engine:
```bash
cd packages/ingestion-pipeline
npx tsx src/index.ts
```

## Running the Dashboard

The dashboard provides a visual interface for the Data Intelligence pipeline:
```bash
cd packages/dashboard
npm run dev
```
Navigate to `http://localhost:3000`.

## Architecture Document
Please refer to the [architecture documentation](./architecture.md) for the detailed strategy covering Kubernetes node distribution, Context Window Overflow avoidance, Redis caching, and graph database storage.

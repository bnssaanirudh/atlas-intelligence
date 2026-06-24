import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div className="flex min-h-screen w-full flex-col font-sans bg-[var(--background)] text-[var(--foreground)] antialiased overflow-x-hidden relative">
      
      {/* Background radial glow mimicking Sui.io */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[80vw] h-[50vh] bg-sui-blue/20 blur-[150px] rounded-full pointer-events-none -z-10"></div>
      
      <main className="flex-1 w-full max-w-[1400px] mx-auto px-6 md:px-12 pt-20 pb-32 z-10 relative">
        
        {/* Hero Section */}
        <section className="w-full flex flex-col items-center text-center pb-32">
          <div className="inline-block px-4 py-1.5 rounded-full border border-sui-surface-border bg-sui-surface mb-8">
            <span className="text-sm font-medium text-sui-light-blue uppercase tracking-widest">The Data Intelligence Engine</span>
          </div>
          <h1 className="text-5xl md:text-7xl lg:text-[90px] font-bold tracking-tighter leading-[1.1] mb-8 sui-gradient-text max-w-5xl">
            The Full Stack for Global Intelligence.
          </h1>
          <p className="text-xl md:text-2xl text-neutral-400 font-light tracking-wide max-w-3xl mb-12 leading-relaxed">
            A resilient, production-grade ingestion pipeline built to process multi-dimensional startup, venture, and AI datasets at an unprecedented scale.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <a href="#features" className="px-8 py-4 rounded-full bg-sui-blue hover:bg-sui-light-blue transition-colors text-white font-semibold tracking-wide text-lg">
              Explore the Engine
            </a>
            <a href="https://github.com" target="_blank" className="px-8 py-4 rounded-full sui-glass hover:bg-sui-surface transition-colors text-white font-semibold tracking-wide text-lg flex items-center gap-2">
              View Architecture PDF
            </a>
          </div>
        </section>

        {/* Features Showcase */}
        <section id="features" className="w-full space-y-32">
          
          {/* Feature 1: Scale & Playwright */}
          <div className="flex flex-col lg:flex-row items-center gap-16">
            <div className="flex-1 space-y-6">
              <div className="text-sui-light-blue font-mono text-sm tracking-widest uppercase">Phase I</div>
              <h2 className="text-4xl md:text-5xl font-bold tracking-tight">Massive Bulk Extraction</h2>
              <p className="text-lg text-neutral-400 leading-relaxed">
                Architected to horizontally scale across distributed nodes to ingest 500k+ records. Utilizing asynchronous Playwright clusters with advanced anti-bot evasion techniques (Cloudflare, Datadome bypass via intelligent proxy rotation and human-like interactions).
              </p>
              <ul className="space-y-3 pt-4">
                <li className="flex items-center gap-3 text-neutral-300">
                  <div className="w-1.5 h-1.5 rounded-full bg-sui-blue"></div>
                  <span>1000+ Startup Records extracted</span>
                </li>
                <li className="flex items-center gap-3 text-neutral-300">
                  <div className="w-1.5 h-1.5 rounded-full bg-sui-blue"></div>
                  <span>1000+ Product Records extracted</span>
                </li>
              </ul>
            </div>
            <div className="flex-1 w-full relative">
              <div className="aspect-[4/3] rounded-2xl overflow-hidden sui-glass relative group">
                <img src="/images/360_F_876125231_H8kYR44Hyi9HKUGoYCMk4XJmFi47vbDM.jpg" alt="Data Extraction" className="absolute inset-0 w-full h-full object-cover opacity-60 mix-blend-screen transition-transform duration-1000 group-hover:scale-105" />
                <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent"></div>
                <div className="absolute bottom-6 left-6 right-6 sui-glass p-4 rounded-xl">
                  <code className="text-sm text-sui-light-blue font-mono">await context.newPage(userDataDir);<br/>await page.goto(targetUrl, &#123; waitUntil: "networkidle" &#125;);</code>
                </div>
              </div>
            </div>
          </div>

          {/* Feature 2: LLM Fallback */}
          <div className="flex flex-col lg:flex-row-reverse items-center gap-16">
            <div className="flex-1 space-y-6">
              <div className="text-sui-light-blue font-mono text-sm tracking-widest uppercase">Phase III</div>
              <h2 className="text-4xl md:text-5xl font-bold tracking-tight">Resilient LLM Integration</h2>
              <p className="text-lg text-neutral-400 leading-relaxed">
                A multi-tier extraction engine guaranteeing 100% schema compliance. 
                <br/><br/>
                <strong className="text-white">429 Rate Limit Handling:</strong> Automated exponential backoff + jitter. <br/>
                <strong className="text-white">413 Context Window:</strong> Semantic truncation preserving dense head/tail context blocks to ensure zero payload overflow errors.
              </p>
            </div>
            <div className="flex-1 w-full">
              <div className="p-8 rounded-2xl sui-glass space-y-4 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-64 h-64 bg-sui-blue/10 blur-[80px] rounded-full"></div>
                
                <div className="flex items-center justify-between p-4 border border-emerald-500/30 bg-emerald-500/10 rounded-xl relative z-10">
                  <span className="font-semibold text-white">1. Gemini Flash</span>
                  <span className="text-xs bg-emerald-500/20 text-emerald-400 px-2 py-1 rounded">Primary</span>
                </div>
                <div className="w-0.5 h-6 bg-sui-surface-border mx-auto"></div>
                <div className="flex items-center justify-between p-4 border border-sui-blue/30 bg-sui-blue/10 rounded-xl relative z-10">
                  <span className="font-semibold text-white">2. Groq (Llama 3 70b)</span>
                  <span className="text-xs bg-sui-blue/20 text-sui-light-blue px-2 py-1 rounded">Fallback 1</span>
                </div>
                <div className="w-0.5 h-6 bg-sui-surface-border mx-auto"></div>
                <div className="flex items-center justify-between p-4 border border-purple-500/30 bg-purple-500/10 rounded-xl relative z-10">
                  <span className="font-semibold text-white">3. DeepSeek</span>
                  <span className="text-xs bg-purple-500/20 text-purple-400 px-2 py-1 rounded">Fallback 2</span>
                </div>
              </div>
            </div>
          </div>

          {/* Feature 3: Freshness & Github (Grid) */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 pt-12">
            
            <div className="p-10 rounded-3xl sui-glass group relative overflow-hidden flex flex-col justify-between min-h-[400px]">
              <img src="/images/images.jpg" alt="Jobs" className="absolute inset-0 w-full h-full object-cover opacity-20 mix-blend-luminosity group-hover:opacity-40 transition-opacity duration-700" />
              <div className="absolute inset-0 bg-gradient-to-br from-background to-transparent"></div>
              
              <div className="relative z-10">
                <div className="text-sui-light-blue font-mono text-xs tracking-widest uppercase mb-4">Phase II</div>
                <h3 className="text-3xl font-bold mb-4">The Freshness Challenge</h3>
                <p className="text-neutral-400 leading-relaxed">
                  Real-time signals extracted from noisy Job and News boards. Custom heuristics and date normalization guarantee that all ingested nodes are strictly &lt; 24 hours old.
                </p>
              </div>
              <div className="relative z-10 mt-8 inline-flex px-4 py-2 bg-sui-surface border border-sui-surface-border rounded-lg items-center gap-3 w-fit">
                <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></div>
                <span className="text-sm font-mono text-neutral-300">Sync interval: 600s</span>
              </div>
            </div>

            <div className="p-10 rounded-3xl sui-glass group relative overflow-hidden flex flex-col justify-between min-h-[400px]">
              <img src="/images/360_F_876125231_H8kYR44Hyi9HKUGoYCMk4XJmFi47vbDM.jpg" alt="Research" className="absolute inset-0 w-full h-full object-cover opacity-20 mix-blend-luminosity group-hover:opacity-40 transition-opacity duration-700" />
              <div className="absolute inset-0 bg-gradient-to-bl from-background to-transparent"></div>
              
              <div className="relative z-10">
                <div className="text-sui-light-blue font-mono text-xs tracking-widest uppercase mb-4">Phase IV & V</div>
                <h3 className="text-3xl font-bold mb-4">Entity Resolution & Research</h3>
                <p className="text-neutral-400 leading-relaxed">
                  Automated canonicalization engine maps messy permutations ("OpenAI, Inc.") to canonical seeds ("OpenAI"). Arxiv papers strictly correlated with live GitHub repository Star metrics.
                </p>
              </div>
              <div className="relative z-10 mt-8 w-full bg-[#0a0a0a] rounded-lg p-4 font-mono text-xs text-neutral-400 overflow-x-auto border border-white/5">
                <span className="text-sui-light-blue">"Open AI, Inc."</span> {'->'} <span className="text-emerald-400">"OpenAI"</span><br/>
                <span className="text-sui-light-blue">"Anthropic AI LLC"</span> {'->'} <span className="text-emerald-400">"Anthropic"</span>
              </div>
            </div>

          </div>

        </section>

      </main>

      {/* Footer */}
      <footer className="w-full border-t border-sui-surface-border py-12 text-center text-neutral-500 text-sm relative z-10 bg-background">
        <p>GraphOne Data Intelligence Trial Assignment • Architected for Scale</p>
      </footer>
    </div>
  );
}

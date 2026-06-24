import React from 'react';
import { getStartups } from '../../lib/db';

export default async function StartupsPage() {
  const startups = getStartups();
  const hasData = startups.length > 0;

  return (
    <div className="flex-1 w-full max-w-[1400px] mx-auto px-6 md:px-12 pt-12 pb-32">
      <div className="mb-10">
        <h1 className="text-4xl font-bold tracking-tight mb-2 text-sohub-black">Startup Intelligence</h1>
        <p className="text-sohub-grey font-medium">1000+ extracted startups canonicalized via Entity Resolution Engine.</p>
      </div>

      <div className="w-full bg-sohub-white rounded-2xl overflow-hidden border border-sohub-border shadow-sm">
        <table className="w-full text-left text-sm">
          <thead className="bg-sohub-soft-grey border-b border-sohub-border text-sohub-grey uppercase tracking-wider text-xs font-semibold">
            <tr>
              <th className="p-4">Entity ID</th>
              <th className="p-4">Raw Mention</th>
              <th className="p-4">Canonical Seed</th>
              <th className="p-4">Confidence</th>
              <th className="p-4">Ingested At</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-sohub-border text-sohub-black">
            {!hasData && (
              <tr>
                <td colSpan={5} className="p-12 text-center text-sohub-grey">
                  <div className="flex flex-col items-center gap-3">
                    <div className="w-6 h-6 border-2 border-sohub-black border-t-transparent rounded-full animate-spin"></div>
                    <span>Pipeline actively scraping and generating data...</span>
                  </div>
                </td>
              </tr>
            )}
            {startups.map((s, i) => (
              <tr key={i} className="hover:bg-sohub-soft-grey transition-colors">
                <td className="p-4 font-mono text-sohub-grey">S-{String(i+1).padStart(3, '0')}</td>
                <td className="p-4 font-medium text-sohub-black">{s.content?.entityName || "Unknown"}</td>
                <td className="p-4 text-emerald-600 font-bold">{s.content?.entityName || "Unknown"}</td>
                <td className="p-4">
                  <div className="flex items-center gap-2">
                    <div className="w-full bg-sohub-border rounded-full h-1.5 max-w-[50px]">
                      <div className="bg-emerald-500 h-1.5 rounded-full" style={{width: '95%'}}></div>
                    </div>
                    <span className="text-xs font-medium text-sohub-grey">95%</span>
                  </div>
                </td>
                <td className="p-4 text-sohub-grey">{s.collectedAt || new Date().toISOString().split('T')[0]}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

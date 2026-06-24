import React from 'react';
import { getProducts } from '../../lib/db';

export default async function ProductsPage() {
  const products = getProducts();
  const hasData = products.length > 0;

  return (
    <div className="flex-1 w-full max-w-[1400px] mx-auto px-6 md:px-12 pt-12 pb-32">
      <div className="mb-10">
        <h1 className="text-4xl font-bold tracking-tight mb-2 text-sohub-black">Product Graph</h1>
        <p className="text-sohub-grey font-medium">1000+ AI products strictly mapped to canonical seed organizations.</p>
      </div>

      <div className="w-full bg-sohub-white rounded-2xl overflow-hidden border border-sohub-border shadow-sm">
        <table className="w-full text-left text-sm">
          <thead className="bg-sohub-soft-grey border-b border-sohub-border text-sohub-grey uppercase tracking-wider text-xs font-semibold">
            <tr>
              <th className="p-4">Product ID</th>
              <th className="p-4">Parent Org (Canonical)</th>
              <th className="p-4">Pricing Model</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-sohub-border text-sohub-black">
            {!hasData && (
              <tr>
                <td colSpan={3} className="p-12 text-center text-sohub-grey">
                  <div className="flex flex-col items-center gap-3">
                    <div className="w-6 h-6 border-2 border-sohub-black border-t-transparent rounded-full animate-spin"></div>
                    <span>Pipeline actively scraping and generating products...</span>
                  </div>
                </td>
              </tr>
            )}
            {products.map((p, i) => (
              <tr key={i} className="hover:bg-sohub-soft-grey transition-colors">
                <td className="p-4 font-mono text-sohub-grey">P-{String(i+1).padStart(3, '0')}</td>
                <td className="p-4 font-bold text-emerald-600">{p.content?.startupName || "Unknown"}</td>
                <td className="p-4">
                  <span className="px-2.5 py-1 bg-sohub-soft-grey border border-sohub-border text-sohub-black rounded-md text-xs font-semibold">
                    {p.content?.pricingModel || "N/A"}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

import React from 'react';
import { getJobs } from '../../lib/db';

export default async function SignalsPage() {
  const jobs = getJobs();
  const hasData = jobs.length > 0;

  return (
    <div className="flex-1 w-full max-w-[1400px] mx-auto px-6 md:px-12 pt-12 pb-32">
      <div className="mb-10">
        <h1 className="text-4xl font-bold tracking-tight mb-2 text-sohub-black">Real-Time Signals</h1>
        <p className="text-sohub-grey font-medium">Strict 24-hour freshness filtered jobs and news signals.</p>
      </div>

      <div className="w-full bg-sohub-white rounded-2xl overflow-hidden border border-sohub-border shadow-sm">
        <table className="w-full text-left text-sm">
          <thead className="bg-sohub-soft-grey border-b border-sohub-border text-sohub-grey uppercase tracking-wider text-xs font-semibold">
            <tr>
              <th className="p-4">Signal ID</th>
              <th className="p-4">Company</th>
              <th className="p-4">Role / Signal Type</th>
              <th className="p-4">Remote Status</th>
              <th className="p-4">Posted Date</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-sohub-border text-sohub-black">
            {!hasData && (
              <tr>
                <td colSpan={5} className="p-12 text-center text-sohub-grey">
                  <div className="flex flex-col items-center gap-3">
                    <div className="w-6 h-6 border-2 border-sohub-black border-t-transparent rounded-full animate-spin"></div>
                    <span>Monitoring data streams for fresh signals...</span>
                  </div>
                </td>
              </tr>
            )}
            {jobs.map((j, i) => (
              <tr key={i} className="hover:bg-sohub-soft-grey transition-colors">
                <td className="p-4 font-mono text-sohub-grey">SIG-{String(i+1).padStart(4, '0')}</td>
                <td className="p-4 text-sohub-black font-bold">{j.content?.company}</td>
                <td className="p-4 text-emerald-600 font-medium">{j.content?.role_family || "Engineering"}</td>
                <td className="p-4">
                  {j.content?.is_remote ? 
                    <span className="px-2.5 py-1 bg-emerald-50 border border-emerald-200 text-emerald-700 font-semibold rounded-md text-xs">Remote</span> : 
                    <span className="px-2.5 py-1 bg-sohub-soft-grey border border-sohub-border text-sohub-black font-semibold rounded-md text-xs">On-Site</span>
                  }
                </td>
                <td className="p-4 text-sohub-grey font-medium">{j.content?.date || "today"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

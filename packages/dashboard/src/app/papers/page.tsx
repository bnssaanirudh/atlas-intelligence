import React from 'react';
import { getPapers } from '../../lib/db';

export default async function PapersPage() {
  const papers = getPapers();
  const hasData = papers.length > 0;

  return (
    <div className="flex-1 w-full max-w-[1400px] mx-auto px-6 md:px-12 pt-12 pb-32">
      <div className="mb-10">
        <h1 className="text-4xl font-bold tracking-tight mb-2 text-sohub-black">Research Papers</h1>
        <p className="text-sohub-grey font-medium">1000+ extracted AI research papers correlated with GitHub metrics.</p>
      </div>

      <div className="w-full bg-sohub-white rounded-2xl overflow-hidden border border-sohub-border shadow-sm">
        <table className="w-full text-left text-sm">
          <thead className="bg-sohub-soft-grey border-b border-sohub-border text-sohub-grey uppercase tracking-wider text-xs font-semibold">
            <tr>
              <th className="p-4">Title</th>
              <th className="p-4">Authors</th>
              <th className="p-4">Paper URL</th>
              <th className="p-4">GitHub Repository</th>
              <th className="p-4">Stars</th>
              <th className="p-4">Published Date</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-sohub-border text-sohub-black">
            {!hasData && (
              <tr>
                <td colSpan={6} className="p-12 text-center text-sohub-grey">
                  <div className="flex flex-col items-center gap-3">
                    <div className="w-6 h-6 border-2 border-sohub-black border-t-transparent rounded-full animate-spin"></div>
                    <span>Pipeline actively syncing with PapersWithCode...</span>
                  </div>
                </td>
              </tr>
            )}
            {papers.map((p, i) => (
              <tr key={i} className="hover:bg-sohub-soft-grey transition-colors">
                <td className="p-4 text-sohub-black font-semibold max-w-xs truncate" title={p.content?.title}>{p.content?.title}</td>
                <td className="p-4 text-sohub-grey max-w-xs truncate">{p.content?.authors?.join(', ')}</td>
                <td className="p-4"><a href={p.content?.paper_url} target="_blank" rel="noreferrer" className="text-blue-600 font-medium hover:underline">Link</a></td>
                <td className="p-4">{p.content?.github_url ? <a href={p.content.github_url} target="_blank" rel="noreferrer" className="text-blue-600 font-medium hover:underline">Repo</a> : <span className="text-sohub-grey">None</span>}</td>
                <td className="p-4 font-mono font-bold text-emerald-600">{p.content?.github_stars || '0'}</td>
                <td className="p-4 text-sohub-grey">{p.content?.published_date?.split('T')[0]}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

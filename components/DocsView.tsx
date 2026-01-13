
import React from 'react';

const DocsView: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto px-8 py-12">
      <header className="mb-12">
        <h1 className="text-4xl font-bold tracking-tight mb-4">General Documentation</h1>
        <p className="text-zinc-400 text-lg leading-relaxed">
          Welcome to the Nexus Core API resource center. Here you can find high-level architecture overviews,
          compliance documents, and downloadable specifications.
        </p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-zinc-900 border border-zinc-800 p-6 rounded-xl hover:border-blue-500/50 transition-colors group">
          <div className="w-12 h-12 bg-blue-600/10 rounded-lg flex items-center justify-center mb-4 group-hover:bg-blue-600/20 transition-colors">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
            </svg>
          </div>
          <h3 className="text-lg font-bold mb-2">Full API Specification (PDF)</h3>
          <p className="text-zinc-500 text-sm mb-6">A complete offline-ready PDF version of this documentation for enterprise compliance and archival.</p>
          <a 
            href="/docs/documentation.pdf" 
            //href="https://uploads-ssl.webflow.com/5f08c2bdc085172b99006a91/5f57eed0d983f9acc1ca0af0_360Alumni%20API%20Documentation.pdf"
            target="_blank"
            className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-500 text-white px-4 py-2 rounded-lg text-sm font-semibold transition-colors"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
            </svg>
            Download PDF Guide
          </a>
        </div>

        <div className="bg-zinc-900 border border-zinc-800 p-6 rounded-xl hover:border-purple-500/50 transition-colors group">
          <div className="w-12 h-12 bg-purple-600/10 rounded-lg flex items-center justify-center mb-4 group-hover:bg-purple-600/20 transition-colors">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-purple-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
          </div>
          <h3 className="text-lg font-bold mb-2">Postman Collection</h3>
          <p className="text-zinc-500 text-sm mb-6">Import our official collection into Postman or Insomnia for rapid environment testing.</p>
          <button className="text-purple-400 hover:text-purple-300 text-sm font-semibold flex items-center gap-1 transition-colors">
            Copy JSON URL
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3" />
            </svg>
          </button>
        </div>
      </div>

      <section className="mt-16 prose prose-invert max-w-none">
        <h2 className="text-2xl font-bold mb-6">Quick Start Guide</h2>
        <div className="space-y-4 text-zinc-400">
          <p>1. Obtain your <code className="text-blue-400">API_KEY</code> from the developer portal.</p>
          <p>2. Use the base URL: <code className="text-zinc-200">https://api.nexus-cloud.com/v2</code>.</p>
          <p>3. All requests must include the <code className="text-zinc-200">Authorization: Bearer</code> header.</p>
        </div>
      </section>
    </div>
  );
};

export default DocsView;

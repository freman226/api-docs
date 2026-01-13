
import React, { useState } from 'react';
import { Endpoint } from '../types';
import CodeBlock from './CodeBlock';
import AiAssistant from './AiAssistant';

interface EndpointViewProps {
  endpoint: Endpoint;
  baseUrl: string;
}

const EndpointView: React.FC<EndpointViewProps> = ({ endpoint, baseUrl }) => {
  const [activeTab, setActiveTab] = useState<'docs' | 'ai'>('docs');

  return (
    <div className="max-w-7xl mx-auto px-8 py-12">
      <div className="flex flex-col lg:flex-row gap-12">
        {/* Left Column: Documentation Content */}
        <div className="flex-1 space-y-12">
          <header>
            <div className="flex items-center gap-4 mb-4">
              <span className={`px-2 py-1 rounded text-xs font-bold mono border ${
                endpoint.method === 'GET' ? 'bg-green-500/10 text-green-500 border-green-500/20' :
                endpoint.method === 'POST' ? 'bg-blue-500/10 text-blue-500 border-blue-500/20' :
                endpoint.method === 'PUT' ? 'bg-yellow-500/10 text-yellow-500 border-yellow-500/20' :
                'bg-red-500/10 text-red-500 border-red-500/20'
              }`}>
                {endpoint.method}
              </span>
              <span className="text-zinc-500 font-mono text-sm tracking-tight">{baseUrl}{endpoint.path}</span>
            </div>
            <h1 className="text-4xl font-bold tracking-tight mb-4">{endpoint.summary}</h1>
            <p className="text-zinc-400 text-lg leading-relaxed">{endpoint.description}</p>
          </header>

          <section>
            <h2 className="text-xl font-bold mb-6 border-b border-zinc-800 pb-4">Request Parameters</h2>
            {endpoint.parameters.length > 0 ? (
              <div className="space-y-6">
                {endpoint.parameters.map((param) => (
                  <div key={param.name} className="flex items-start gap-4 pb-6 border-b border-zinc-800/50 last:border-0">
                    <div className="min-w-[120px]">
                      <code className="text-blue-400 text-sm font-mono font-bold">{param.name}</code>
                      {param.required && <span className="ml-2 text-[10px] text-red-400 font-bold uppercase tracking-widest">Required</span>}
                    </div>
                    <div>
                      <span className="text-xs text-zinc-500 mono bg-zinc-900 px-2 py-0.5 rounded border border-zinc-800 uppercase tracking-tighter">
                        {param.type}
                      </span>
                      <p className="mt-2 text-sm text-zinc-400 leading-relaxed">{param.description}</p>
                      <p className="mt-1 text-[10px] text-zinc-600 uppercase font-bold">Location: {param.location}</p>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-zinc-600 italic">No parameters required for this request.</p>
            )}
          </section>

          <section>
            <h2 className="text-xl font-bold mb-6 border-b border-zinc-800 pb-4">Responses</h2>
            <div className="space-y-8">
              {endpoint.responses.map((resp) => (
                <div key={resp.status}>
                  <div className="flex items-center gap-3 mb-4">
                    <span className={`w-3 h-3 rounded-full ${resp.status < 300 ? 'bg-green-500' : 'bg-red-500'}`}></span>
                    <h4 className="text-sm font-bold text-zinc-200">{resp.status} - {resp.description}</h4>
                  </div>
                  <CodeBlock code={resp.schema} title="Response Body" />
                </div>
              ))}
            </div>
          </section>
        </div>

        {/* Right Column: Interaction & AI */}
        <div className="lg:w-[400px] shrink-0">
          <div className="sticky top-12 space-y-8">
            <div className="flex rounded-lg bg-zinc-900 p-1 border border-zinc-800">
              <button 
                onClick={() => setActiveTab('docs')}
                className={`flex-1 py-2 text-xs font-bold uppercase tracking-widest transition-all rounded-md ${
                  activeTab === 'docs' ? 'bg-zinc-800 text-white shadow-sm' : 'text-zinc-500 hover:text-zinc-300'
                }`}
              >
                Code
              </button>
              <button 
                onClick={() => setActiveTab('ai')}
                className={`flex-1 py-2 text-xs font-bold uppercase tracking-widest transition-all rounded-md ${
                  activeTab === 'ai' ? 'bg-zinc-800 text-white shadow-sm' : 'text-zinc-500 hover:text-zinc-300'
                }`}
              >
                AI Assistant
              </button>
            </div>

            {activeTab === 'docs' ? (
              <div className="space-y-6">
                <CodeBlock 
                  title="cURL Example" 
                  code={`curl -X ${endpoint.method} "${baseUrl}${endpoint.path}" \\\n  -H "Authorization: Bearer YOUR_TOKEN" \\\n  -H "Content-Type: application/json"`} 
                  language="bash" 
                />
                <CodeBlock 
                  title="Node.js Fetch" 
                  code={`const response = await fetch("${baseUrl}${endpoint.path}", {\n  method: "${endpoint.method}",\n  headers: {\n    "Authorization": "Bearer YOUR_TOKEN",\n    "Content-Type": "application/json"\n  }\n});\nconst data = await response.json();`} 
                  language="javascript" 
                />
              </div>
            ) : (
              <AiAssistant endpoint={endpoint} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default EndpointView;

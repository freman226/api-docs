
import React from 'react';
import { ApiDoc, HttpMethod } from '../types';

interface SidebarProps {
  data: ApiDoc;
  activeEndpointId: string | null;
  currentView: 'endpoint' | 'docs';
  onSelectEndpoint: (id: string) => void;
  onSelectDocs: () => void;
  searchTerm: string;
  onSearchChange: (val: string) => void;
}

const MethodBadge: React.FC<{ method: HttpMethod }> = ({ method }) => {
  const colors = {
    GET: 'text-green-400',
    POST: 'text-blue-400',
    PUT: 'text-yellow-400',
    DELETE: 'text-red-400',
    PATCH: 'text-purple-400',
  };
  return <span className={`text-[10px] font-bold w-12 mono ${colors[method]}`}>{method}</span>;
};

const Sidebar: React.FC<SidebarProps> = ({ 
  data, 
  activeEndpointId, 
  currentView,
  onSelectEndpoint, 
  onSelectDocs,
  searchTerm, 
  onSearchChange 
}) => {
  return (
    <aside className="w-80 h-screen sticky top-0 bg-zinc-950 border-r border-zinc-800 flex flex-col overflow-hidden">
      <div className="p-6 border-b border-zinc-800">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center font-bold text-white shadow-lg shadow-blue-900/20">N</div>
          <div>
            <h1 className="text-sm font-bold tracking-tight">{data.title}</h1>
            <p className="text-[10px] text-zinc-500 uppercase tracking-widest">{data.version}</p>
          </div>
        </div>
        
        <div className="relative">
          <input
            type="text"
            placeholder="Search documentation..."
            className="w-full bg-zinc-900 border border-zinc-800 rounded-md py-2 px-3 text-sm focus:outline-none focus:ring-1 focus:ring-blue-500 transition-all placeholder:text-zinc-600"
            value={searchTerm}
            onChange={(e) => onSearchChange(e.target.value)}
          />
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-8 no-scrollbar">
        {/* Resources Section */}
        <div>
          <h3 className="text-xs font-semibold text-zinc-500 uppercase tracking-widest px-2 mb-3">
            Resources
          </h3>
          <button
            onClick={onSelectDocs}
            className={`w-full text-left px-3 py-2 rounded-md text-sm transition-all flex items-center gap-3 group ${
              currentView === 'docs' 
                ? 'bg-zinc-800 text-white' 
                : 'text-zinc-400 hover:bg-zinc-900 hover:text-zinc-200'
            }`}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
            </svg>
            General API Guide
          </button>
        </div>

        {/* API Endpoints */}
        {data.categories.map((cat) => {
          const filteredEndpoints = cat.endpoints.filter(e => 
            e.summary.toLowerCase().includes(searchTerm.toLowerCase()) || 
            e.path.toLowerCase().includes(searchTerm.toLowerCase())
          );

          if (filteredEndpoints.length === 0 && searchTerm) return null;

          return (
            <div key={cat.name}>
              <h3 className="text-xs font-semibold text-zinc-500 uppercase tracking-widest px-2 mb-3">
                {cat.name}
              </h3>
              <div className="space-y-1">
                {filteredEndpoints.map((ep) => (
                  <button
                    key={ep.id}
                    onClick={() => onSelectEndpoint(ep.id)}
                    className={`w-full text-left px-3 py-2 rounded-md text-sm transition-all flex items-center gap-2 group ${
                      currentView === 'endpoint' && activeEndpointId === ep.id 
                        ? 'bg-blue-600/10 text-blue-400 font-medium' 
                        : 'text-zinc-400 hover:bg-zinc-900 hover:text-zinc-200'
                    }`}
                  >
                    <MethodBadge method={ep.method} />
                    <span className="truncate">{ep.summary}</span>
                  </button>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </aside>
  );
};

export default Sidebar;

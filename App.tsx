
import React, { useState, useMemo, useEffect } from 'react';
import { INITIAL_API_DATA } from './constants';
import Sidebar from './components/Sidebar';
import EndpointView from './components/EndpointView';
import DocsView from './components/DocsView';

const App: React.FC = () => {
  const [apiData] = useState(INITIAL_API_DATA);
  const [currentView, setCurrentView] = useState<'endpoint' | 'docs'>('endpoint');
  const [activeEndpointId, setActiveEndpointId] = useState<string>(INITIAL_API_DATA.categories[0].endpoints[0].id);
  const [searchTerm, setSearchTerm] = useState('');

  // Hash-based routing logic
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash;
      if (hash === '#docs') {
        setCurrentView('docs');
      } else if (hash.startsWith('#endpoint-')) {
        const id = hash.replace('#endpoint-', '');
        setActiveEndpointId(id);
        setCurrentView('endpoint');
      }
    };

    // Initialize on load
    handleHashChange();

    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const activeEndpoint = useMemo(() => {
    for (const cat of apiData.categories) {
      const ep = cat.endpoints.find(e => e.id === activeEndpointId);
      if (ep) return ep;
    }
    return null;
  }, [activeEndpointId, apiData]);

  const handleSelectEndpoint = (id: string) => {
    window.location.hash = `#endpoint-${id}`;
  };

  const handleSelectDocs = () => {
    window.location.hash = '#docs';
  };

  return (
    <div className="flex min-h-screen">
      <Sidebar 
        data={apiData} 
        activeEndpointId={activeEndpointId}
        currentView={currentView}
        onSelectEndpoint={handleSelectEndpoint}
        onSelectDocs={handleSelectDocs}
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
      />
      
      <main className="flex-1 bg-black overflow-y-auto h-screen relative no-scrollbar">
        {/* Decorative Background Elements */}
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-600/10 blur-[150px] -z-10 rounded-full"></div>
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-purple-600/5 blur-[150px] -z-10 rounded-full"></div>
        
        {currentView === 'docs' ? (
          <DocsView />
        ) : activeEndpoint ? (
          <EndpointView 
            endpoint={activeEndpoint} 
            baseUrl={apiData.baseUrl} 
          />
        ) : (
          <div className="flex items-center justify-center h-full text-zinc-600">
            <p className="text-sm font-medium">Select an endpoint or resource to view documentation</p>
          </div>
        )}
      </main>
    </div>
  );
};

export default App;

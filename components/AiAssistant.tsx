
import React, { useState, useRef, useEffect } from 'react';
import { Endpoint, ChatMessage } from '../types';
import { askAiAboutEndpoint } from '../services/geminiService';

interface AiAssistantProps {
  endpoint: Endpoint;
}

const AiAssistant: React.FC<AiAssistantProps> = ({ endpoint }) => {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMsg: ChatMessage = { role: 'user', content: input };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsLoading(true);

    try {
      const response = await askAiAboutEndpoint(endpoint, input, messages);
      const modelMsg: ChatMessage = { role: 'model', content: response };
      setMessages(prev => [...prev, modelMsg]);
    } catch (error) {
      console.error(error);
      setMessages(prev => [...prev, { role: 'model', content: "Error communicating with the AI. Check your connection or API key." }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-zinc-900 border border-zinc-800 rounded-xl overflow-hidden flex flex-col h-[500px] shadow-2xl">
      <div className="p-4 bg-zinc-800/30 border-b border-zinc-800 flex items-center gap-2">
        <div className="w-2 h-2 rounded-full bg-blue-500 animate-pulse"></div>
        <h3 className="text-sm font-semibold text-zinc-200">AI Documentation Assistant</h3>
      </div>
      
      <div ref={scrollRef} className="flex-1 overflow-y-auto p-4 space-y-4 no-scrollbar">
        {messages.length === 0 && (
          <div className="text-center py-10 px-6">
            <p className="text-zinc-500 text-sm">Ask anything about the <span className="text-blue-400 font-mono">{endpoint.path}</span> endpoint.</p>
            <div className="mt-4 flex flex-wrap justify-center gap-2">
              {["How do I use this?", "Show me a JS example", "Explain parameters"].map(q => (
                <button 
                  key={q} 
                  onClick={() => setInput(q)}
                  className="text-[10px] bg-zinc-800 hover:bg-zinc-700 text-zinc-400 px-3 py-1.5 rounded-full border border-zinc-700 transition-colors"
                >
                  {q}
                </button>
              ))}
            </div>
          </div>
        )}
        
        {messages.map((m, i) => (
          <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`max-w-[85%] px-4 py-2.5 rounded-2xl text-sm ${
              m.role === 'user' 
                ? 'bg-blue-600 text-white rounded-tr-none' 
                : 'bg-zinc-800 text-zinc-300 rounded-tl-none border border-zinc-700'
            }`}>
              <p className="whitespace-pre-wrap leading-relaxed">{m.content}</p>
            </div>
          </div>
        ))}
        {isLoading && (
          <div className="flex justify-start">
            <div className="bg-zinc-800 text-zinc-500 px-4 py-2 rounded-2xl rounded-tl-none border border-zinc-700">
              <span className="animate-bounce inline-block mx-0.5">.</span>
              <span className="animate-bounce inline-block mx-0.5" style={{animationDelay: '0.2s'}}>.</span>
              <span className="animate-bounce inline-block mx-0.5" style={{animationDelay: '0.4s'}}>.</span>
            </div>
          </div>
        )}
      </div>

      <div className="p-4 bg-zinc-950 border-t border-zinc-800">
        <div className="flex gap-2">
          <input 
            type="text" 
            placeholder="Ask a technical question..."
            className="flex-1 bg-zinc-900 border border-zinc-800 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
          />
          <button 
            onClick={handleSend}
            disabled={isLoading || !input.trim()}
            className="bg-blue-600 hover:bg-blue-500 disabled:opacity-50 disabled:cursor-not-allowed text-white px-4 py-2 rounded-lg transition-colors"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};

export default AiAssistant;

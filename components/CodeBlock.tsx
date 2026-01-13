
import React, { useState } from 'react';

interface CodeBlockProps {
  code: string;
  language?: string;
  title?: string;
}

const CodeBlock: React.FC<CodeBlockProps> = ({ code, language = 'json', title }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="bg-zinc-900 border border-zinc-800 rounded-lg overflow-hidden my-4 group relative">
      <div className="flex items-center justify-between px-4 py-2 bg-zinc-800/50 border-b border-zinc-800">
        <span className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest">
          {title || language}
        </span>
        <button 
          onClick={handleCopy}
          className="text-[10px] text-zinc-400 hover:text-white transition-colors uppercase tracking-wider font-bold"
        >
          {copied ? 'Copied!' : 'Copy'}
        </button>
      </div>
      <div className="p-4 overflow-x-auto mono text-xs leading-relaxed text-zinc-300 whitespace-pre">
        {code}
      </div>
    </div>
  );
};

export default CodeBlock;

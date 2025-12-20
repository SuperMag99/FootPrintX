
import React, { useState } from 'react';
import { Dork, Engine } from '../types';
import { Copy, Check, ExternalLink, ShieldCheck } from 'lucide-react';

interface DorkCardProps {
  dork: Dork;
}

const DorkCard: React.FC<DorkCardProps> = ({ dork }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(dork.query);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const getEngineColor = (engine: Engine) => {
    switch (engine) {
      case Engine.GOOGLE: return 'bg-blue-500/10 text-blue-400 border-blue-500/20';
      case Engine.BING: return 'bg-teal-500/10 text-teal-400 border-teal-500/20';
      case Engine.YANDEX: return 'bg-red-500/10 text-red-400 border-red-500/20';
      default: return 'bg-slate-500/10 text-slate-400 border-slate-500/20';
    }
  };

  const getSearchUrl = () => {
    const encoded = encodeURIComponent(dork.query);
    switch (dork.engine) {
      case Engine.GOOGLE: return `https://www.google.com/search?q=${encoded}`;
      case Engine.BING: return `https://www.bing.com/search?q=${encoded}`;
      case Engine.YANDEX: return `https://yandex.com/search/?text=${encoded}`;
      default: return `https://www.google.com/search?q=${encoded}`;
    }
  };

  return (
    <div className="group bg-slate-900 border border-slate-800 hover:border-emerald-500/50 rounded-xl p-4 transition-all hover:shadow-lg hover:shadow-emerald-500/5">
      <div className="flex items-start justify-between mb-2">
        <div className="flex flex-col gap-1">
          <h4 className="text-sm font-semibold text-slate-200 group-hover:text-emerald-400 transition-colors flex items-center gap-2">
            {dork.title}
            <span className={`text-[10px] uppercase tracking-wider px-2 py-0.5 rounded-full border ${getEngineColor(dork.engine)}`}>
              {dork.engine}
            </span>
          </h4>
          <p className="text-xs text-slate-500 leading-relaxed">
            {dork.description}
          </p>
        </div>
        <div className="flex gap-2">
          <button
            onClick={handleCopy}
            className={`p-2 rounded-lg border transition-all ${
              copied 
                ? 'bg-emerald-500/10 border-emerald-500/50 text-emerald-400' 
                : 'bg-slate-800 border-slate-700 text-slate-400 hover:bg-slate-700 hover:text-white'
            }`}
            title="Copy Query"
          >
            {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
          </button>
          <a
            href={getSearchUrl()}
            target="_blank"
            rel="noreferrer"
            className="p-2 bg-slate-800 border border-slate-700 text-slate-400 hover:bg-slate-700 hover:text-white rounded-lg transition-all"
            title="Search Now"
          >
            <ExternalLink className="w-4 h-4" />
          </a>
        </div>
      </div>
      
      <div className="mt-3 relative">
        <div className="mono text-xs bg-slate-950 p-3 rounded-lg border border-slate-800 overflow-x-auto whitespace-nowrap text-emerald-500 selection:bg-emerald-500/30">
          {dork.query}
        </div>
      </div>
    </div>
  );
};

export default DorkCard;


import React from 'react';
import { AlertTriangle, ShieldCheck } from 'lucide-react';

const Disclaimer: React.FC = () => {
  return (
    <div className="bg-amber-500/5 border border-amber-500/20 rounded-xl p-6 mb-8">
      <div className="flex items-start gap-4">
        <div className="p-3 bg-amber-500/10 rounded-full">
          <AlertTriangle className="w-6 h-6 text-amber-500" />
        </div>
        <div>
          <h3 className="text-lg font-bold text-amber-500 mb-1">Legal & Ethical Disclaimer</h3>
          <div className="space-y-2 text-sm text-slate-400 leading-relaxed">
            <p>
              This tool is for <span className="text-slate-200 font-medium underline decoration-amber-500/50">educational and lawful OSINT purposes only</span>. 
              The generator only produces search queries (dorks) and does not perform any scraping, 
              private data access, or API abuse.
            </p>
            <ul className="list-disc list-inside space-y-1 ml-2">
              <li>No personal data is collected or stored.</li>
              <li>Queries are processed entirely on the client-side.</li>
              <li>Responsibility for usage lies solely with the user.</li>
              <li>Users must adhere to all applicable laws and search engine Terms of Service.</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Disclaimer;

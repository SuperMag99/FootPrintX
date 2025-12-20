
import React, { useState } from 'react';
import { DorkCategory } from '../types';
import DorkCard from './DorkCard';
import { ChevronDown, ChevronUp, Info } from 'lucide-react';

interface DorkSectionProps {
  category: DorkCategory;
}

const DorkSection: React.FC<DorkSectionProps> = ({ category }) => {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <div className="space-y-4">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between p-4 bg-slate-900 border border-slate-800 rounded-xl hover:bg-slate-800/50 transition-colors group"
      >
        <div className="flex items-center gap-4">
          <div className="w-1 h-8 bg-emerald-500 rounded-full"></div>
          <div className="text-left">
            <h3 className="font-bold text-lg text-slate-100 group-hover:text-emerald-400 transition-colors">
              {category.title}
            </h3>
            <p className="text-sm text-slate-400 flex items-center gap-1.5">
              <Info className="w-3.5 h-3.5" />
              {category.explanation}
            </p>
          </div>
        </div>
        <div className="text-slate-500">
          {isOpen ? <ChevronUp /> : <ChevronDown />}
        </div>
      </button>

      {isOpen && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pl-4 border-l-2 border-slate-800/50 animate-in fade-in slide-in-from-top-2 duration-300">
          {category.dorks.map((dork) => (
            <DorkCard key={dork.id} dork={dork} />
          ))}
        </div>
      )}
    </div>
  );
};

export default DorkSection;

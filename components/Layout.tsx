
import React, { ReactNode } from 'react';
import { ViewState } from '../types';
import { Shield, Search, User, Instagram, Github, Info, Menu, X, Terminal, Twitter, Linkedin, Mail, Heart, Scale } from 'lucide-react';

interface LayoutProps {
  children: ReactNode;
  currentView: ViewState;
  setView: (view: ViewState) => void;
}

const Layout: React.FC<LayoutProps> = ({ children, currentView, setView }) => {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  const navItems = [
    { id: 'HOME' as ViewState, label: 'Home', icon: Shield },
    { id: 'INSTA' as ViewState, label: 'Instagram', icon: Instagram },
    { id: 'X' as ViewState, label: 'X (Twitter)', icon: Twitter },
    { id: 'LINKEDIN' as ViewState, label: 'LinkedIn', icon: Linkedin },
    { id: 'EMAIL' as ViewState, label: 'Email', icon: Mail },
    { id: 'PERSON' as ViewState, label: 'Person', icon: User },
    { id: 'ABOUT' as ViewState, label: 'About', icon: Info },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-slate-950 text-slate-200">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-slate-900/80 backdrop-blur-md border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
          <div 
            className="flex items-center gap-2 cursor-pointer group"
            onClick={() => setView('HOME')}
          >
            <div className="p-2 bg-emerald-500/10 rounded-lg group-hover:bg-emerald-500/20 transition-colors">
              <Terminal className="w-6 h-6 text-emerald-500" />
            </div>
            <span className="text-xl font-bold tracking-tight bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent">
              FootprintX
            </span>
          </div>

          {/* Desktop Nav */}
          <nav className="hidden xl:flex items-center gap-1">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => setView(item.id)}
                className={`flex items-center gap-2 px-3 py-1.5 rounded-md transition-all text-sm ${
                  currentView === item.id 
                    ? 'bg-emerald-500/10 text-emerald-400 font-medium' 
                    : 'text-slate-400 hover:text-slate-100 hover:bg-slate-800'
                }`}
              >
                <item.icon className="w-4 h-4" />
                {item.label}
              </button>
            ))}
          </nav>

          {/* Mobile Menu Toggle */}
          <button 
            className="xl:hidden p-2 text-slate-400"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X /> : <Menu />}
          </button>
        </div>

        {/* Mobile Nav */}
        {isMenuOpen && (
          <div className="xl:hidden border-t border-slate-800 bg-slate-900 px-4 py-4 space-y-1">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => {
                  setView(item.id);
                  setIsMenuOpen(false);
                }}
                className={`flex items-center gap-3 w-full px-4 py-3 rounded-lg transition-all ${
                  currentView === item.id 
                    ? 'bg-emerald-500/10 text-emerald-400' 
                    : 'text-slate-400'
                }`}
              >
                <item.icon className="w-5 h-5" />
                {item.label}
              </button>
            ))}
          </div>
        )}
      </header>

      {/* Main Content */}
      <main className="flex-grow max-w-7xl mx-auto w-full px-4 py-8">
        {children}
      </main>

      {/* Footer */}
      <footer className="bg-slate-900 border-t border-slate-800 py-12 px-4 mt-12">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <Terminal className="w-5 h-5 text-emerald-500" />
              <span className="text-lg font-bold">FootprintX</span>
            </div>
            <p className="text-sm text-slate-400 max-w-xs">
              Open-source passive OSINT tool for ethical investigators. 
              Built for transparency, efficiency, and safety.
            </p>
            <div className="flex gap-4">
              <a href="https://github.com/SuperMag99" target="_blank" rel="noreferrer" className="text-slate-400 hover:text-white transition-colors">
                <Github className="w-5 h-5" />
              </a>
              <a href="https://www.linkedin.com/in/mag99/" target="_blank" rel="noreferrer" className="text-slate-400 hover:text-white transition-colors">
                <Linkedin className="w-5 h-5" />
              </a>
            </div>
          </div>
          
          <div className="space-y-4">
            <h4 className="font-semibold text-slate-200">Modules</h4>
            <ul className="text-sm text-slate-400 space-y-2">
              <li><button onClick={() => setView('INSTA')} className="hover:text-emerald-400 transition-colors">Instagram OSINT</button></li>
              <li><button onClick={() => setView('X')} className="hover:text-emerald-400 transition-colors">X (Twitter) OSINT</button></li>
              <li><button onClick={() => setView('LINKEDIN')} className="hover:text-emerald-400 transition-colors">LinkedIn OSINT</button></li>
              <li><button onClick={() => setView('EMAIL')} className="hover:text-emerald-400 transition-colors">Email OSINT</button></li>
            </ul>
          </div>

          <div className="space-y-4">
            <h4 className="font-semibold text-slate-200">Legal</h4>
            <ul className="text-sm text-slate-400 space-y-2">
              <li><button onClick={() => setView('COPYRIGHT')} className="hover:text-emerald-400 transition-colors flex items-center gap-2"><Scale className="w-3.5 h-3.5" /> License & Legal</button></li>
              <li className="text-xs text-slate-500 leading-relaxed pt-2">
                FootprintX generates search engine queries only. No scraping or personal data collection.
              </li>
            </ul>
            <p className="text-xs text-slate-400 flex items-center gap-1">
              Built with <Heart className="w-3 h-3 text-red-500 fill-red-500" /> for the OSINT community.
            </p>
          </div>
        </div>
        <div className="max-w-7xl mx-auto mt-12 pt-8 border-t border-slate-800 text-center text-xs text-slate-600">
          <p>© 2025 FootprintX Open Source Project.</p>
          <p className="mt-1">Released under the MIT License. Open Source OSINT Initiative.</p>
        </div>
      </footer>
    </div>
  );
};

export default Layout;

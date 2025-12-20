
import React, { useState, useMemo } from 'react';
import Layout from './components/Layout';
import Disclaimer from './components/Disclaimer';
import DorkSection from './components/DorkSection';
import SmartAssistant from './components/SmartAssistant';
import { ViewState, DorkCategory } from './types';
import { generateInstaDorks, generatePersonDorks, generateXDorks, generateLinkedInDorks, generateEmailDorks } from './services/dorkEngine';
import { Instagram, User, Shield, Search, ArrowRight, Github, Code, ExternalLink, RefreshCcw, Info, Twitter, Linkedin, Mail, AlertCircle, CheckCircle2, Heart, Scale, MessageSquare } from 'lucide-react';

const App: React.FC = () => {
  const [view, setView] = useState<ViewState>('HOME');
  
  // Form States
  const [instaUser, setInstaUser] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [xUser, setXUser] = useState('');
  const [liName, setLiName] = useState('');
  const [liCompany, setLiCompany] = useState('');
  const [emailAddress, setEmailAddress] = useState('');
  const [options, setOptions] = useState({ variations: true, transliterate: false });

  // Validation Patterns
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  const handleRegex = /^[a-zA-Z0-9._]{1,30}$/; // Standard for IG/X
  const nameRegex = /^[a-zA-Z\s-']{2,50}$/;

  // Computed Validation State
  const validation = useMemo(() => ({
    insta: {
      valid: handleRegex.test(instaUser.trim()),
      dirty: instaUser.trim().length > 0
    },
    x: {
      valid: handleRegex.test(xUser.trim()),
      dirty: xUser.trim().length > 0
    },
    linkedin: {
      valid: nameRegex.test(liName.trim()),
      dirty: liName.trim().length > 0
    },
    email: {
      valid: emailRegex.test(emailAddress.trim()),
      dirty: emailAddress.trim().length > 0
    },
    person: {
      firstValid: nameRegex.test(firstName.trim()),
      lastValid: nameRegex.test(lastName.trim()),
      dirty: firstName.trim().length > 0 || lastName.trim().length > 0
    }
  }), [instaUser, xUser, liName, emailAddress, firstName, lastName]);

  // Memoized Categories - Only generate if validation passes
  const instaCategories = useMemo(() => validation.insta.valid ? generateInstaDorks(instaUser) : [], [instaUser, validation.insta.valid]);
  const personCategories = useMemo(() => (validation.person.firstValid && validation.person.lastValid) ? generatePersonDorks(firstName, lastName, options) : [], [firstName, lastName, options, validation.person.firstValid, validation.person.lastValid]);
  const xCategories = useMemo(() => validation.x.valid ? generateXDorks(xUser) : [], [xUser, validation.x.valid]);
  const liCategories = useMemo(() => validation.linkedin.valid ? generateLinkedInDorks(liName, liCompany) : [], [liName, liCompany, validation.linkedin.valid]);
  const emailCategories = useMemo(() => validation.email.valid ? generateEmailDorks(emailAddress) : [], [emailAddress, validation.email.valid]);

  const renderHome = () => (
    <div className="space-y-12 py-8">
      <div className="text-center max-w-4xl mx-auto space-y-6">
        <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight">
          Modern <span className="text-emerald-500">OSINT</span>.<br />
          Elite Dorking.
        </h1>
        <p className="text-xl text-slate-400 max-w-2xl mx-auto">
          Automate advanced search engine queries for ethical reconnaissance. 
          Passive intelligence gathering across five distinct modules.
        </p>
        <div className="flex flex-wrap justify-center gap-4 pt-6">
          <ModuleButton icon={<Instagram />} label="Instagram" onClick={() => setView('INSTA')} color="bg-pink-600" />
          <ModuleButton icon={<Twitter />} label="X (Twitter)" onClick={() => setView('X')} color="bg-sky-600" />
          <ModuleButton icon={<Linkedin />} label="LinkedIn" onClick={() => setView('LINKEDIN')} color="bg-blue-700" />
          <ModuleButton icon={<Mail />} label="Email OSINT" onClick={() => setView('EMAIL')} color="bg-emerald-600" />
          <ModuleButton icon={<User />} label="Person OSINT" onClick={() => setView('PERSON')} color="bg-slate-700" />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
        <FeatureCard 
          icon={<Shield className="text-emerald-500" />}
          title="100% Passive"
          desc="Pure dork generation. We don't touch target APIs or accounts. Completely invisible reconnaissance."
        />
        <FeatureCard 
          icon={<Code className="text-cyan-500" />}
          title="Engine Optimized"
          desc="Custom queries for Google, Bing, and Yandex to bypass standard search noise."
        />
        <FeatureCard 
          icon={<RefreshCcw className="text-purple-500" />}
          title="Zero Logging"
          desc="All parameters stay in your local memory. No backend, no databases, no tracking."
        />
      </div>

      <Disclaimer />
    </div>
  );

  const renderX = () => (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-8 shadow-xl">
        <div className="flex items-center gap-4 mb-6">
          <div className="p-3 bg-sky-500/10 rounded-2xl">
            <Twitter className="w-8 h-8 text-sky-500" />
          </div>
          <div>
            <h2 className="text-2xl font-bold">X (Twitter) OSINT</h2>
            <p className="text-slate-400">Discover interaction history, mentions, and indexed tweets.</p>
          </div>
        </div>
        <div className="max-w-xl">
          <label className="block text-sm font-medium text-slate-300 mb-2">X Username or @Handle</label>
          <div className="relative">
            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 font-mono text-lg">@</span>
            <input 
              type="text" 
              value={xUser}
              onChange={(e) => setXUser(e.target.value.replace('@', ''))}
              placeholder="username_here"
              className={`w-full bg-slate-950 border ${validation.x.dirty && !validation.x.valid ? 'border-red-500' : validation.x.valid ? 'border-emerald-500/50' : 'border-slate-700'} rounded-xl py-4 pl-10 pr-4 text-sky-400 font-mono focus:ring-2 focus:ring-sky-500 focus:outline-none transition-all placeholder:text-slate-800`}
            />
            {validation.x.valid && (
              <CheckCircle2 className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-emerald-500" />
            )}
          </div>
          {validation.x.dirty && !validation.x.valid && (
            <p className="mt-2 text-xs text-red-400 flex items-center gap-1 animate-in fade-in slide-in-from-top-1">
              <AlertCircle className="w-3 h-3" /> Usernames must be 1-30 characters (letters, numbers, ., _) with no spaces.
            </p>
          )}
        </div>
      </div>
      {xCategories.length > 0 && (
        <div className="space-y-8 mt-12">
          {xCategories.map(cat => <DorkSection key={cat.id} category={cat} />)}
          <SmartAssistant />
        </div>
      )}
    </div>
  );

  const renderLinkedIn = () => (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-8 shadow-xl">
        <div className="flex items-center gap-4 mb-6">
          <div className="p-3 bg-blue-500/10 rounded-2xl">
            <Linkedin className="w-8 h-8 text-blue-500" />
          </div>
          <div>
            <h2 className="text-2xl font-bold">LinkedIn OSINT</h2>
            <p className="text-slate-400">Locate professional profiles, employment history, and documents.</p>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-2xl">
          <div className="relative">
            <label className="block text-sm font-medium text-slate-300 mb-2">Full Name</label>
            <input 
              type="text" 
              value={liName}
              onChange={(e) => setLiName(e.target.value)}
              placeholder="John Doe"
              className={`w-full bg-slate-950 border ${validation.linkedin.dirty && !validation.linkedin.valid ? 'border-red-500' : validation.linkedin.valid ? 'border-emerald-500/50' : 'border-slate-700'} rounded-xl py-3 px-4 text-blue-400 focus:ring-2 focus:ring-blue-500 focus:outline-none transition-all placeholder:text-slate-800`}
            />
            {validation.linkedin.dirty && !validation.linkedin.valid && (
              <p className="mt-2 text-xs text-red-400 flex items-center gap-1 animate-in fade-in slide-in-from-top-1">
                <AlertCircle className="w-3 h-3" /> Please enter a valid name (min 2 chars, no special symbols).
              </p>
            )}
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">Company (Optional)</label>
            <input 
              type="text" 
              value={liCompany}
              onChange={(e) => setLiCompany(e.target.value)}
              placeholder="Company Name"
              className="w-full bg-slate-950 border border-slate-700 rounded-xl py-3 px-4 text-blue-400 focus:ring-2 focus:ring-blue-500 focus:outline-none transition-all placeholder:text-slate-800"
            />
          </div>
        </div>
      </div>
      {liCategories.length > 0 && (
        <div className="space-y-8 mt-12">
          {liCategories.map(cat => <DorkSection key={cat.id} category={cat} />)}
          <SmartAssistant />
        </div>
      )}
    </div>
  );

  const renderEmail = () => (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-8 shadow-xl">
        <div className="flex items-center gap-4 mb-6">
          <div className="p-3 bg-emerald-500/10 rounded-2xl">
            <Mail className="w-8 h-8 text-emerald-500" />
          </div>
          <div>
            <h2 className="text-2xl font-bold">Email OSINT</h2>
            <p className="text-slate-400">Expose email footprint, potential breaches, and associated profiles.</p>
          </div>
        </div>
        <div className="max-w-xl">
          <label className="block text-sm font-medium text-slate-300 mb-2">Email Address</label>
          <div className="relative">
            <input 
              type="email" 
              value={emailAddress}
              onChange={(e) => setEmailAddress(e.target.value)}
              placeholder="target@example.com"
              className={`w-full bg-slate-950 border ${validation.email.dirty && !validation.email.valid ? 'border-red-500' : validation.email.valid ? 'border-emerald-500/50' : 'border-slate-700'} rounded-xl py-4 px-4 text-emerald-400 font-mono focus:ring-2 focus:ring-emerald-500 focus:outline-none transition-all placeholder:text-slate-800`}
            />
            {validation.email.valid && (
              <CheckCircle2 className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-emerald-500" />
            )}
          </div>
          {validation.email.dirty && !validation.email.valid && (
            <p className="mt-2 text-xs text-red-400 flex items-center gap-1 animate-in fade-in slide-in-from-top-1">
              <AlertCircle className="w-3 h-3" /> Please enter a correctly formatted email address (e.g., user@domain.com).
            </p>
          )}
        </div>
      </div>
      {emailCategories.length > 0 && (
        <div className="space-y-8 mt-12">
          {emailCategories.map(cat => <DorkSection key={cat.id} category={cat} />)}
          <SmartAssistant />
        </div>
      )}
    </div>
  );

  const renderInsta = () => (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-8 shadow-xl">
        <div className="flex items-center gap-4 mb-6">
          <div className="p-3 bg-pink-500/10 rounded-2xl">
            <Instagram className="w-8 h-8 text-pink-500" />
          </div>
          <div>
            <h2 className="text-2xl font-bold">Instagram OSINT</h2>
            <p className="text-slate-400">Locate profiles, tagged content, and cross-platform mentions.</p>
          </div>
        </div>
        <div className="max-w-xl">
          <label className="block text-sm font-medium text-slate-300 mb-2">Username or @Handle</label>
          <div className="relative">
            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 font-mono text-lg">@</span>
            <input 
              type="text" 
              value={instaUser}
              onChange={(e) => setInstaUser(e.target.value.replace('@', ''))}
              placeholder="username_here"
              className={`w-full bg-slate-950 border ${validation.insta.dirty && !validation.insta.valid ? 'border-red-500' : validation.insta.valid ? 'border-emerald-500/50' : 'border-slate-700'} rounded-xl py-4 pl-10 pr-4 text-pink-400 font-mono focus:ring-2 focus:ring-pink-500 focus:outline-none transition-all placeholder:text-slate-800`}
            />
            {validation.insta.valid && (
              <CheckCircle2 className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-emerald-500" />
            )}
          </div>
          {validation.insta.dirty && !validation.insta.valid && (
            <p className="mt-2 text-xs text-red-400 flex items-center gap-1 animate-in fade-in slide-in-from-top-1">
              <AlertCircle className="w-3 h-3" /> Invalid handle. Use letters, numbers, underscores, and dots (max 30).
            </p>
          )}
        </div>
      </div>
      {instaCategories.length > 0 && (
        <div className="space-y-8 mt-12">
          {instaCategories.map(cat => <DorkSection key={cat.id} category={cat} />)}
          <SmartAssistant />
        </div>
      )}
    </div>
  );

  const renderPerson = () => (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-8 shadow-xl">
        <div className="flex items-center gap-4 mb-6">
          <div className="p-3 bg-slate-500/10 rounded-2xl">
            <User className="w-8 h-8 text-slate-400" />
          </div>
          <div>
            <h2 className="text-2xl font-bold">Person OSINT</h2>
            <p className="text-slate-400">Discover identity footprints using first and last names.</p>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-2xl">
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">First Name</label>
            <input 
              type="text" 
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              placeholder="John"
              className={`w-full bg-slate-950 border ${firstName.length > 0 && !validation.person.firstValid ? 'border-red-500' : validation.person.firstValid ? 'border-emerald-500/50' : 'border-slate-700'} rounded-xl py-3 px-4 text-slate-200 focus:ring-2 focus:ring-slate-500 focus:outline-none transition-all placeholder:text-slate-800`}
            />
            {firstName.length > 0 && !validation.person.firstValid && (
              <p className="mt-2 text-xs text-red-400 flex items-center gap-1 animate-in fade-in slide-in-from-top-1">
                <AlertCircle className="w-3 h-3" /> Invalid first name format.
              </p>
            )}
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">Last Name</label>
            <input 
              type="text" 
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              placeholder="Doe"
              className={`w-full bg-slate-950 border ${lastName.length > 0 && !validation.person.lastValid ? 'border-red-500' : validation.person.lastValid ? 'border-emerald-500/50' : 'border-slate-700'} rounded-xl py-3 px-4 text-slate-200 focus:ring-2 focus:ring-slate-500 focus:outline-none transition-all placeholder:text-slate-800`}
            />
            {lastName.length > 0 && !validation.person.lastValid && (
              <p className="mt-2 text-xs text-red-400 flex items-center gap-1 animate-in fade-in slide-in-from-top-1">
                <AlertCircle className="w-3 h-3" /> Invalid last name format.
              </p>
            )}
          </div>
        </div>
        <div className="mt-6 flex flex-wrap gap-4">
          <label className="flex items-center gap-2 cursor-pointer group">
            <input 
              type="checkbox" 
              checked={options.variations}
              onChange={(e) => setOptions({...options, variations: e.target.checked})}
              className="w-4 h-4 rounded border-slate-700 text-emerald-500 focus:ring-emerald-500 bg-slate-950"
            />
            <span className="text-sm text-slate-400 group-hover:text-slate-200 transition-colors">Include variations</span>
          </label>
        </div>
      </div>
      {personCategories.length > 0 && (
        <div className="space-y-8 mt-12">
          {personCategories.map(cat => <DorkSection key={cat.id} category={cat} />)}
          <SmartAssistant />
        </div>
      )}
    </div>
  );

  const renderAbout = () => (
    <div className="max-w-4xl mx-auto space-y-12 py-8 prose prose-invert">
      <section className="bg-slate-900 rounded-3xl p-10 border border-slate-800 shadow-2xl">
        <h1 className="text-4xl font-bold mb-6 flex items-center gap-3">
          <Info className="text-emerald-500" />
          About FootprintX
        </h1>
        <p className="text-slate-300 leading-relaxed text-lg mb-8">
          FootprintX is an open-source passive OSINT tool designed for the intelligence community. 
          By combining modular dork engines with a clean, privacy-focused interface, it allows 
          researchers to query standard search engines with surgical precision.
        </p>
        
        <div className="bg-slate-950/50 border border-slate-800 rounded-2xl p-8 mb-10">
          <h2 className="text-2xl font-bold text-emerald-400 mb-4 flex items-center gap-2">
            <User className="w-6 h-6" /> Maintained By
          </h2>
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div>
              <p className="text-xl font-bold text-slate-100">Mohammad Ghanem</p>
            </div>
            <div className="flex gap-4">
              <a 
                href="https://github.com/SuperMag99" 
                target="_blank" 
                rel="noreferrer"
                className="flex items-center gap-2 bg-slate-800 hover:bg-slate-700 px-4 py-2 rounded-xl text-sm font-medium transition-all hover:scale-105"
              >
                <Github className="w-4 h-4" /> GitHub
              </a>
              <a 
                href="https://www.linkedin.com/in/mag99/" 
                target="_blank" 
                rel="noreferrer"
                className="flex items-center gap-2 bg-blue-600 hover:bg-blue-500 px-4 py-2 rounded-xl text-sm font-medium transition-all hover:scale-105"
              >
                <Linkedin className="w-4 h-4" /> LinkedIn
              </a>
            </div>
          </div>
          <p className="mt-6 text-slate-400 text-sm leading-relaxed">
            This project is open-source and community-driven. Contributions, feedback, and collaboration 
            from fellow researchers and developers are always welcome.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-1 gap-8">
          <div className="space-y-4">
            <h3 className="text-xl font-bold flex items-center gap-2">
              <Code className="text-purple-400" /> Project Roadmap
            </h3>
            <ul className="text-sm space-y-2 text-slate-400 list-inside list-disc">
              <li>Username Correlation Engine</li>
              <li>Image OSINT / Metadata Indexing</li>
              <li>Infrastructure & Domain Pivot Mode</li>
              <li>SOC / Threat Intel Quick-Links</li>
              <li>Browser Extension Integration</li>
            </ul>
          </div>
        </div>

        {/* Feedback Section */}
        <div className="mt-10 pt-8 border-t border-slate-800">
          <h3 className="text-xl font-bold flex items-center gap-2 mb-4">
            <MessageSquare className="text-emerald-400" /> Feedback & Collaboration
          </h3>
          <p className="text-slate-400 text-sm leading-relaxed mb-4">
            Have a suggestion for a new dork module? Found a bug? Or just want to discuss OSINT techniques? 
            I'm always looking to improve FootprintX and welcome any feedback or recommendations.
          </p>
          <a 
            href="https://www.linkedin.com/in/mag99/" 
            target="_blank" 
            rel="noreferrer"
            className="inline-flex items-center gap-2 text-emerald-400 hover:text-emerald-300 font-medium transition-all"
          >
            Contact me on LinkedIn <ExternalLink className="w-4 h-4" />
          </a>
        </div>
      </section>
    </div>
  );

  const renderCopyright = () => (
    <div className="max-w-4xl mx-auto space-y-12 py-8 prose prose-invert">
      <section className="bg-slate-900 rounded-3xl p-10 border border-slate-800 shadow-2xl">
        <h1 className="text-4xl font-bold mb-6 flex items-center gap-3">
          <Scale className="text-emerald-500" />
          Copyright & Legal
        </h1>
        
        <div className="space-y-8">
          <div className="bg-slate-950/50 p-6 rounded-2xl border border-slate-800">
            <h2 className="text-xl font-bold mb-4">MIT License</h2>
            <div className="mono text-xs text-slate-400 bg-slate-950 p-4 rounded-lg overflow-x-auto leading-relaxed">
              Copyright (c) 2025 Mohammad Ghanem<br/><br/>
              Permission is hereby granted, free of charge, to any person obtaining a copy
              of this software and associated documentation files (the "Software"), to deal
              in the Software without restriction, including without limitation the rights
              to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
              copies of the Software, and to permit persons to whom the Software is
              furnished to do so, subject to the following conditions:<br/><br/>
              The above copyright notice and this permission notice shall be included in all
              copies or substantial portions of the Software.<br/><br/>
              THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
              IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
              FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
              AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
              LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
              OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
              SOFTWARE.
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="text-xl font-bold">Intellectual Property Note</h3>
            <p className="text-slate-400 text-sm leading-relaxed">
              All trademarks, platform names, and service names (e.g., Google, Instagram, X, LinkedIn, Yandex) mentioned in this project are the property of their respective owners. FootprintX is an independent open-source project and is not affiliated with or endorsed by these platforms.
            </p>
          </div>

          <div className="bg-red-500/5 p-6 rounded-2xl border border-red-500/10">
            <h3 className="text-xl font-bold text-red-400 mb-2">Passive OSINT Enforcement</h3>
            <p className="text-slate-400 text-sm leading-relaxed">
              This tool only generates search engine queries. It does not collect, store, scrape, or process personal data from target platforms. Users are solely responsible for ensuring compliance with applicable privacy laws and search engine ethical standards.
            </p>
          </div>
        </div>
      </section>
    </div>
  );

  return (
    <Layout currentView={view} setView={setView}>
      {view === 'HOME' && renderHome()}
      {view === 'INSTA' && renderInsta()}
      {view === 'X' && renderX()}
      {view === 'LINKEDIN' && renderLinkedIn()}
      {view === 'EMAIL' && renderEmail()}
      {view === 'PERSON' && renderPerson()}
      {view === 'ABOUT' && renderAbout()}
      {view === 'COPYRIGHT' && renderCopyright()}
    </Layout>
  );
};

// Internal Helper Components
const ModuleButton: React.FC<{ icon: React.ReactNode; label: string; onClick: () => void; color: string }> = ({ icon, label, onClick, color }) => (
  <button 
    onClick={onClick}
    className={`group flex items-center gap-3 ${color} hover:opacity-90 text-white px-6 py-3 rounded-xl font-bold transition-all hover:scale-105 active:scale-95 shadow-lg shadow-black/20`}
  >
    <div className="w-5 h-5">{icon}</div>
    {label}
    <ArrowRight className="w-4 h-4 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
  </button>
);

const FeatureCard: React.FC<{ icon: React.ReactNode; title: string; desc: string }> = ({ icon, title, desc }) => (
  <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl hover:border-slate-700 transition-colors shadow-xl">
    <div className="mb-4">{icon}</div>
    <h3 className="font-bold text-lg mb-2">{title}</h3>
    <p className="text-sm text-slate-400 leading-relaxed">{desc}</p>
  </div>
);

export default App;

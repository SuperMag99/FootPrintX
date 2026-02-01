
import React, { useState } from 'react';
import { GoogleGenAI } from "@google/genai";
import { Sparkles, Loader2, Send, BrainCircuit, Bot } from 'lucide-react';

const SmartAssistant: React.FC = () => {
  const [prompt, setPrompt] = useState('');
  const [response, setResponse] = useState('');
  const [loading, setLoading] = useState(false);

  const handleAsk = async () => {
    if (!prompt.trim()) return;
    setLoading(true);
    setResponse('');

    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const result = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: `You are an OSINT expert assistant for a tool called FootprintX. The user is using a dork generator tool. 
        Analyze the following query or scenario and suggest advanced dork strategies, explaining the risks and ethical boundaries.
        User Query: ${prompt}`,
        config: {
            systemInstruction: "You are a professional OSINT researcher. Keep answers technical, safe, and focused on passive reconnaissance. Always emphasize legality.",
            temperature: 0.7,
        }
      });
      
      setResponse(result.text || 'No response generated.');
    } catch (error) {
      console.error(error);
      setResponse('Failed to connect to AI assistant. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mt-8 bg-gradient-to-b from-[#111827] to-[#0B0E14] border border-blue-500/20 rounded-3xl p-1 shadow-2xl relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-blue-500 opacity-50"></div>
      
      <div className="bg-[#111827]/90 backdrop-blur-xl rounded-[22px] p-6 sm:p-8">
        <div className="flex items-center gap-4 mb-6">
          <div className="p-3 bg-blue-600 rounded-xl shadow-[0_0_15px_rgba(37,99,235,0.5)] relative">
            <Bot className="w-6 h-6 text-white" />
            <span className="absolute -top-1 -right-1 flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-blue-500"></span>
            </span>
          </div>
          <div>
            <h3 className="text-xl font-bold text-white tracking-tight">AI Analyst</h3>
            <p className="text-xs text-blue-400 font-medium uppercase tracking-wide">Gemini 3 Flash • Online</p>
          </div>
        </div>

        {/* Chat Area */}
        <div className="space-y-4">
           {response ? (
             <div className="bg-[#1F2937] rounded-2xl rounded-tl-none p-6 border border-white/5 animate-in fade-in slide-in-from-left-2">
               <div className="prose prose-invert prose-sm max-w-none text-slate-300 leading-relaxed">
                 {response}
               </div>
             </div>
           ) : (
             <div className="bg-[#1F2937]/50 rounded-2xl p-6 border border-white/5 border-dashed flex flex-col items-center justify-center text-center py-12">
                <BrainCircuit className="w-10 h-10 text-slate-600 mb-3" />
                <p className="text-sm text-slate-500">
                   Describe your target or objective.<br/>I will generate custom dork strategies.
                </p>
             </div>
           )}
        </div>

        {/* Input Area */}
        <div className="mt-6 relative">
          <input
            type="text"
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder="Ask AI Analyst..."
            className="w-full bg-[#0B0E14] border border-white/10 rounded-xl pl-5 pr-14 py-4 text-sm text-white focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 focus:outline-none transition-all placeholder:text-slate-600 shadow-inner"
            onKeyDown={(e) => e.key === 'Enter' && handleAsk()}
          />
          <button
            onClick={handleAsk}
            disabled={loading || !prompt}
            className="absolute right-2 top-2 bottom-2 aspect-square bg-blue-600 hover:bg-blue-500 disabled:opacity-50 disabled:bg-slate-700 text-white rounded-lg transition-all flex items-center justify-center shadow-lg shadow-blue-900/20"
          >
            {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : <Send className="w-4 h-4" />}
          </button>
        </div>
      </div>
    </div>
  );
};

export default SmartAssistant;

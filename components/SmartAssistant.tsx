
import React, { useState } from 'react';
// Correct import statement as per guidelines
import { GoogleGenAI } from "@google/genai";
import { Sparkles, Loader2, Send, BrainCircuit } from 'lucide-react';

const SmartAssistant: React.FC = () => {
  const [prompt, setPrompt] = useState('');
  const [response, setResponse] = useState('');
  const [loading, setLoading] = useState(false);

  const handleAsk = async () => {
    if (!prompt.trim()) return;
    setLoading(true);
    setResponse('');

    try {
      // Use correct initialization with named parameter as per guidelines
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      // Use ai.models.generateContent directly as per guidelines
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
      
      // Accessing the .text property directly (not a method call) as per guidelines
      setResponse(result.text || 'No response generated.');
    } catch (error) {
      console.error(error);
      setResponse('Failed to connect to AI assistant. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mt-12 bg-indigo-500/5 border border-indigo-500/20 rounded-2xl p-6">
      <div className="flex items-center gap-3 mb-4">
        <div className="p-2 bg-indigo-500/20 rounded-lg">
          <BrainCircuit className="w-5 h-5 text-indigo-400" />
        </div>
        <div>
          <h3 className="text-lg font-bold text-indigo-300">OSINT Smart Assistant</h3>
          <p className="text-xs text-indigo-400/80">Ask for advanced dork strategies or explanations.</p>
        </div>
      </div>

      <div className="flex gap-2 mb-4">
        <input
          type="text"
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder="e.g. How can I find mentions of this person on foreign forums?"
          className="flex-grow bg-slate-900 border border-slate-700 rounded-lg px-4 py-2 text-sm focus:ring-2 focus:ring-indigo-500 focus:outline-none transition-all"
          onKeyDown={(e) => e.key === 'Enter' && handleAsk()}
        />
        <button
          onClick={handleAsk}
          disabled={loading || !prompt}
          className="bg-indigo-600 hover:bg-indigo-500 disabled:opacity-50 text-white px-4 py-2 rounded-lg transition-colors flex items-center gap-2 text-sm font-medium"
        >
          {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Sparkles className="w-4 h-4" />}
          Consult AI
        </button>
      </div>

      {response && (
        <div className="bg-slate-950/50 rounded-xl p-4 border border-indigo-500/10 animate-in fade-in slide-in-from-bottom-2">
          <div className="prose prose-invert prose-sm max-w-none text-slate-300 whitespace-pre-wrap leading-relaxed">
            {response}
          </div>
        </div>
      )}
    </div>
  );
};

export default SmartAssistant;

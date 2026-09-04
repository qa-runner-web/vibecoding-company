import React, { useState } from 'react';
import { Bot, Sparkles, Send, Copy, Check, Flame, Zap, Database, Terminal } from 'lucide-react';
import { generateVibeWithGemini, type GeminiGenerationResult } from '../lib/gemini';

export const GeminiGenerator: React.FC = () => {
  const [prompt, setPrompt] = useState('');
  const [style, setStyle] = useState('10x Speedrun');
  const [loading, setLoading] = useState(false);
  const [output, setOutput] = useState<GeminiGenerationResult | null>(null);
  const [copied, setCopied] = useState(false);

  const presetIdeas = [
    'Sub-50ms Markdown notes app that auto-links everything with Gemini embeddings',
    'AI agent that auto-merges green PRs and deploys to Vercel preview instantly',
    'Aesthetic dark-mode crypto terminal with live DEX websocket stream and AI whale radar',
    'Single-prompt micro-SaaS billing gateway on Supabase Auth + Stripe webhooks',
  ];

  const handleGenerate = async (ideaPrompt?: string) => {
    const textToRun = ideaPrompt || prompt;
    if (!textToRun.trim()) return;
    if (ideaPrompt) setPrompt(ideaPrompt);

    setLoading(true);
    try {
      const res = await generateVibeWithGemini(textToRun, style);
      setOutput(res);
    } catch (e) {
      console.error('Generation error', e);
    } finally {
      setLoading(false);
    }
  };

  const handleCopy = () => {
    if (!output) return;
    navigator.clipboard.writeText(output.text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-6">
      {/* Hero card */}
      <div className="rounded-2xl bg-gradient-to-br from-[#151522] via-[#10101a] to-[#0d0d15] border border-cyan-500/30 p-6 md:p-8 relative overflow-hidden shadow-xl">
        <div className="absolute top-0 right-0 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-magenta-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-6">
          <div className="flex items-center gap-3">
            <div className="p-3 rounded-2xl bg-cyan-500/10 border border-cyan-500/30 text-cyan-400">
              <Bot className="w-7 h-7" />
            </div>
            <div>
              <h2 className="text-2xl font-extrabold text-white flex items-center gap-2">
                Gemini 2.0 Vibecoding Engine
                <span className="text-[11px] font-mono font-bold px-2 py-0.5 rounded-full bg-cyan-500/20 text-cyan-300 border border-cyan-500/30">
                  FREE TIER ACTIVE
                </span>
              </h2>
              <p className="text-sm text-slate-400">
                Feed any concept, get an end-to-end fullstack blueprint engineered for one-shot agent execution.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 self-end md:self-auto">
            <span className="text-xs font-mono text-slate-400">Preset:</span>
            <select
              value={style}
              onChange={(e) => setStyle(e.target.value)}
              className="px-3 py-1.5 rounded-xl bg-slate-900 border border-slate-700 text-cyan-300 text-xs font-mono font-semibold focus:outline-none focus:border-cyan-400"
            >
              <option>10x Speedrun</option>
              <option>Cyberpunk Glitch</option>
              <option>SaaS Micro-Empire</option>
              <option>Clean Minimalist</option>
              <option>Agentic Loop</option>
            </select>
          </div>
        </div>

        {/* Input box */}
        <div className="relative mb-4">
          <textarea
            rows={3}
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder="Type your wildest software idea here (e.g. Build an autonomous code agent that writes tests, reviews PRs, and pings my Slack...)"
            className="w-full p-4 pr-28 rounded-2xl bg-[#09090f] border border-slate-700 text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400 text-sm font-sans resize-none shadow-inner"
          />
          <button
            onClick={() => handleGenerate()}
            disabled={loading || !prompt.trim()}
            className="absolute bottom-4 right-4 flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-black font-bold text-xs transition-all shadow-lg shadow-cyan-500/20 disabled:opacity-40"
          >
            {loading ? (
              <Sparkles className="w-4 h-4 animate-spin" />
            ) : (
              <Send className="w-4 h-4" />
            )}
            {loading ? 'Synthesizing...' : 'Vibecode It'}
          </button>
        </div>

        {/* Quick idea seeds */}
        <div>
          <span className="text-xs font-mono text-slate-500 uppercase tracking-wider mr-2">Quick Seeds:</span>
          <div className="flex flex-wrap gap-2 mt-2">
            {presetIdeas.map((idea, idx) => (
              <button
                key={idx}
                onClick={() => handleGenerate(idea)}
                className="text-xs text-left px-3 py-1.5 rounded-lg bg-slate-900/90 hover:bg-slate-800 text-slate-300 hover:text-cyan-300 border border-slate-800 transition-all font-mono"
              >
                ⚡ {idea.slice(0, 48)}...
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Output card */}
      {output && (
        <div className="rounded-2xl bg-[#11111a] border border-cyan-500/40 p-6 shadow-2xl relative animate-fadeIn">
          <div className="flex items-center justify-between mb-4 pb-4 border-b border-slate-800">
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 text-xs font-bold font-mono">
                <Zap className="w-3.5 h-3.5 fill-cyan-400" />
                Vibe Score: {output.vibeScore}/100
              </div>
              <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-purple-500/20 text-purple-300 border border-purple-500/40 text-xs font-bold font-mono">
                <Database className="w-3.5 h-3.5" />
                Logged to Supabase
              </div>
            </div>

            <button
              onClick={handleCopy}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 text-cyan-400 text-xs font-mono font-semibold border border-slate-700 transition-all"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
              {copied ? 'Copied to Clipboard' : 'Copy Blueprint'}
            </button>
          </div>

          <div className="prose prose-invert max-w-none text-slate-200 text-sm whitespace-pre-wrap font-sans leading-relaxed">
            {output.text}
          </div>
        </div>
      )}
    </div>
  );
};

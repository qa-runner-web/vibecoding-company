import React, { useEffect, useState } from 'react';
import { Terminal, Copy, Check, Heart, Sparkles } from 'lucide-react';
import { PromptTemplate } from '../types';
import { supabase } from '../lib/supabase';

export const PromptVault: React.FC = () => {
  const [prompts, setPrompts] = useState<PromptTemplate[]>([]);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  useEffect(() => {
    async function loadPrompts() {
      try {
        const { data, error } = await supabase.from('prompts').select('*').order('created_at', { ascending: false });
        if (data && !error) {
          setPrompts(data);
        }
      } catch (e) {
        console.error('Failed to load prompts from Supabase', e);
      }
    }
    loadPrompts();
  }, []);

  const handleCopy = (id: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold text-white flex items-center gap-2">
            <Terminal className="w-5 h-5 text-cyan-400" />
            Blake's Master Prompt Vault
          </h2>
          <p className="text-xs text-slate-400 font-mono">
            Zero-shot prompt recipes tested with Gemini 2.0 Flash & Ara Coding Agents
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {prompts.map((p) => (
          <div
            key={p.id}
            className="rounded-2xl bg-[#11111a] border border-slate-800 hover:border-cyan-500/40 p-5 transition-all flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-cyan-950 text-cyan-300 border border-cyan-800">
                  {p.model}
                </span>
                <div className="flex items-center gap-1 text-xs text-slate-400 font-mono">
                  <Heart className="w-3.5 h-3.5 text-magenta-400 fill-magenta-400/20" />
                  {p.likes}
                </div>
              </div>

              <h3 className="text-base font-bold text-white mb-2">{p.title}</h3>

              <div className="rounded-xl bg-[#09090f] border border-slate-800 p-3 mb-3 font-mono text-xs text-slate-300">
                <p className="text-slate-500 text-[10px] uppercase font-bold mb-1">System Prompt</p>
                <p className="line-clamp-2 text-slate-400 italic mb-2">"{p.system_prompt}"</p>
                <p className="text-slate-500 text-[10px] uppercase font-bold mb-1">User Prompt</p>
                <p className="text-cyan-200">"{p.user_prompt}"</p>
              </div>

              <div className="flex flex-wrap gap-1.5 mb-4">
                {p.tags.map((t, idx) => (
                  <span key={idx} className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-900 text-slate-400 border border-slate-800">
                    #{t}
                  </span>
                ))}
              </div>
            </div>

            <button
              onClick={() => handleCopy(p.id, `${p.system_prompt}\n\n${p.user_prompt}`)}
              className="w-full flex items-center justify-center gap-2 px-3 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-cyan-300 text-xs font-mono font-bold border border-slate-800 hover:border-cyan-500/30 transition-all"
            >
              {copiedId === p.id ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
              {copiedId === p.id ? 'Copied Prompt!' : 'Copy Full Prompt'}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

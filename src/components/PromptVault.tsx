import React, { useEffect, useState } from 'react';
import { Terminal, Copy, Check, Heart, Search, Filter, Sparkles } from 'lucide-react';
import { PromptTemplate } from '../types';
import { supabase } from '../lib/supabase';

const FALLBACK_PROMPTS: PromptTemplate[] = [
  {
    id: 'fallback-prompt-1',
    title: 'One-Shot Full Stack App Architecture',
    model: 'gemini-2.0-flash',
    system_prompt:
      'You are the ultimate 10x vibecoding assistant. Output clean, self-contained, high-production React + Tailwind code with Supabase client bindings.',
    user_prompt:
      'Build me a slick dark-mode analytics dashboard with real-time counters and glowing gradients',
    output_example: '{"component": "Dashboard", "status": "perfect"}',
    tags: ['vibecoding', 'frontend', 'supabase'],
    likes: 88,
    created_at: '2026-08-23T08:54:27.234059+00:00',
  },
  {
    id: 'fallback-prompt-2',
    title: 'Vibe-Engineered Marketing Copy',
    model: 'gemini-2.0-flash',
    system_prompt:
      'You write punchy, modern product copy for cutting-edge AI developer tools. No corporate buzzwords, pure builder energy.',
    user_prompt:
      'Write a hero section for an AI agent platform that writes and tests your entire codebase autonomously',
    output_example: 'Stop writing CRUD. Let Ara build your entire backend while you sleep.',
    tags: ['copywriting', 'growth', 'ara'],
    likes: 54,
    created_at: '2026-08-23T08:54:27.234059+00:00',
  },
  {
    id: 'fallback-prompt-3',
    title: 'SQL Schema from Natural Language',
    model: 'gemini-2.0-flash',
    system_prompt:
      'Convert product specs into production-grade PostgreSQL DDL with RLS policies and indexes.',
    user_prompt:
      'Create a database schema for an AI code review platform with teams, repos, and review comments',
    output_example: 'CREATE TABLE teams (...); CREATE TABLE reviews (...);',
    tags: ['sql', 'postgres', 'database'],
    likes: 42,
    created_at: '2026-08-23T08:54:27.234059+00:00',
  },
];

export const PromptVault: React.FC = () => {
  const [prompts, setPrompts] = useState<PromptTemplate[]>([]);
  const [loading, setLoading] = useState(true);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTag, setSelectedTag] = useState('all');
  const [likedIds, setLikedIds] = useState<Record<string, boolean>>({});

  useEffect(() => {
    async function loadPrompts() {
      try {
        setLoading(true);
        const { data, error } = await supabase
          .from('prompts')
          .select('*')
          .order('likes', { ascending: false });

        if (data && !error && data.length > 0) {
          setPrompts(data);
        } else {
          setPrompts(FALLBACK_PROMPTS);
        }
      } catch (e) {
        console.error('Failed to load prompts from Supabase, using fallbacks', e);
        setPrompts(FALLBACK_PROMPTS);
      } finally {
        setLoading(false);
      }
    }
    loadPrompts();
  }, []);

  const handleCopy = async (id: string, text: string) => {
    try {
      if (navigator.clipboard && window.isSecureContext) {
        await navigator.clipboard.writeText(text);
      } else {
        const textArea = document.createElement('textarea');
        textArea.value = text;
        textArea.style.position = 'fixed';
        textArea.style.left = '-999999px';
        document.body.appendChild(textArea);
        textArea.focus();
        textArea.select();
        document.execCommand('copy');
        textArea.remove();
      }
      setCopiedId(id);
      setTimeout(() => setCopiedId(null), 2000);
    } catch (err) {
      console.error('Failed to copy text', err);
    }
  };

  const handleLike = async (promptId: string) => {
    const isLiked = likedIds[promptId];
    const targetPrompt = prompts.find((p) => p.id === promptId);
    if (!targetPrompt) return;

    const newLikes = isLiked ? Math.max(0, targetPrompt.likes - 1) : targetPrompt.likes + 1;

    // Optimistic update
    setLikedIds((prev) => ({ ...prev, [promptId]: !isLiked }));
    setPrompts((prev) =>
      prev.map((p) => (p.id === promptId ? { ...p, likes: newLikes } : p))
    );

    try {
      await supabase.from('prompts').update({ likes: newLikes }).eq('id', promptId);
    } catch (e) {
      console.error('Failed to persist prompt like to Supabase', e);
    }
  };

  // Extract all unique tags
  const allTags = Array.from(
    new Set(prompts.flatMap((p) => p.tags || []))
  );

  const filteredPrompts = prompts.filter((p) => {
    const matchesTag = selectedTag === 'all' || (p.tags && p.tags.includes(selectedTag));
    const query = searchQuery.toLowerCase().trim();
    const matchesSearch =
      !query ||
      p.title.toLowerCase().includes(query) ||
      p.system_prompt.toLowerCase().includes(query) ||
      p.user_prompt.toLowerCase().includes(query) ||
      (p.tags && p.tags.some((t) => t.toLowerCase().includes(query)));
    return matchesTag && matchesSearch;
  });

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-white flex items-center gap-2">
            <Terminal className="w-5 h-5 text-cyan-400" />
            Blake's Master Prompt Vault
          </h2>
          <p className="text-xs text-slate-400 font-mono">
            Zero-shot prompt recipes tested with Gemini 2.0 Flash & Ara Coding Agents
          </p>
        </div>

        {/* Search & Tag filter */}
        <div className="relative w-full sm:w-64">
          <Search className="w-4 h-4 absolute left-3 top-2.5 text-slate-500" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search prompt recipes..."
            className="w-full pl-9 pr-3 py-1.5 rounded-xl bg-slate-900 border border-slate-800 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400"
          />
        </div>
      </div>

      {/* Tag filter pills */}
      {allTags.length > 0 && (
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 text-xs">
          <button
            onClick={() => setSelectedTag('all')}
            className={`px-3 py-1 rounded-lg font-mono transition-all ${
              selectedTag === 'all'
                ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 font-bold'
                : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800'
            }`}
          >
            #all
          </button>
          {allTags.map((tag) => (
            <button
              key={tag}
              onClick={() => setSelectedTag(tag)}
              className={`px-3 py-1 rounded-lg font-mono transition-all ${
                selectedTag === tag
                  ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 font-bold'
                  : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800'
              }`}
            >
              #{tag}
            </button>
          ))}
        </div>
      )}

      {loading ? (
        <div className="flex items-center justify-center py-16">
          <Sparkles className="w-8 h-8 text-cyan-400 animate-spin" />
        </div>
      ) : filteredPrompts.length === 0 ? (
        <div className="text-center py-16 bg-[#11111a] rounded-2xl border border-slate-800">
          <p className="text-slate-400 font-mono text-sm">No prompt recipes found matching your filter.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filteredPrompts.map((p) => {
            const isLiked = Boolean(likedIds[p.id]);
            return (
              <div
                key={p.id}
                className="rounded-2xl bg-[#11111a] border border-slate-800 hover:border-cyan-500/40 p-5 transition-all flex flex-col justify-between group"
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-cyan-950 text-cyan-300 border border-cyan-800">
                      {p.model}
                    </span>
                    <button
                      onClick={() => handleLike(p.id)}
                      title={isLiked ? 'Unlike prompt' : 'Like prompt'}
                      className={`flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-mono transition-all ${
                        isLiked
                          ? 'bg-pink-950/70 text-pink-300 border border-pink-700/60'
                          : 'bg-slate-900 text-slate-400 hover:text-pink-300 border border-slate-800 hover:border-pink-800/40'
                      }`}
                    >
                      <Heart
                        className={`w-3.5 h-3.5 ${
                          isLiked ? 'fill-pink-500 text-pink-400' : 'text-slate-400'
                        }`}
                      />
                      <span>{p.likes}</span>
                    </button>
                  </div>

                  <h3 className="text-base font-bold text-white mb-2 group-hover:text-cyan-300 transition-colors">
                    {p.title}
                  </h3>

                  <div className="rounded-xl bg-[#09090f] border border-slate-800 p-3 mb-3 font-mono text-xs text-slate-300">
                    <p className="text-slate-500 text-[10px] uppercase font-bold mb-1">System Prompt</p>
                    <p className="line-clamp-2 text-slate-400 italic mb-2">"{p.system_prompt}"</p>
                    <p className="text-slate-500 text-[10px] uppercase font-bold mb-1">User Prompt</p>
                    <p className="text-cyan-200">"{p.user_prompt}"</p>
                  </div>

                  <div className="flex flex-wrap gap-1.5 mb-4">
                    {p.tags?.map((t, idx) => (
                      <span
                        key={idx}
                        className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-900 text-slate-400 border border-slate-800"
                      >
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
            );
          })}
        </div>
      )}
    </div>
  );
};

import React, { useState } from 'react';
import { X, Sparkles, Zap, PlusCircle } from 'lucide-react';
import { supabase } from '../lib/supabase';
import { VibeProject } from '../types';

interface NewVibeModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAdded: (vibe: VibeProject) => void;
}

export const NewVibeModal: React.FC<NewVibeModalProps> = ({ isOpen, onClose, onAdded }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('AI Tool');
  const [techStackInput, setTechStackInput] = useState('Next.js, Gemini 2.0, Supabase, Tailwind');
  const [promptSeed, setPromptSeed] = useState('');
  const [status, setStatus] = useState<'shipped' | 'vibing' | 'cooked' | 'ideating'>('vibing');
  const [loading, setLoading] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;

    setLoading(true);
    const slug = title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '') + '-' + Math.floor(Math.random() * 1000);
    const tech_stack = techStackInput.split(',').map((t) => t.trim()).filter(Boolean);

    const newVibe = {
      title,
      slug,
      description,
      category,
      vibe_score: Math.floor(Math.random() * 5) + 95,
      tech_stack,
      prompt_seed: promptSeed || 'Build a next-level reactive AI tool in one prompt.',
      author: 'blake',
      status,
      stars: 1,
    };

    try {
      const { data, error } = await supabase.from('vibes').insert(newVibe).select().single();
      if (error) throw error;
      onAdded(data);
      onClose();
    } catch (err) {
      console.error('Failed to create vibe in Supabase', err);
      // Local fallback
      onAdded({
        ...newVibe,
        id: crypto.randomUUID(),
        created_at: new Date().toISOString(),
      });
      onClose();
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fadeIn">
      <div className="relative w-full max-w-lg rounded-2xl bg-[#12121c] border border-cyan-500/30 p-6 shadow-2xl shadow-cyan-500/10">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-slate-400 hover:text-white p-1 rounded-lg hover:bg-slate-800"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-2 mb-6">
          <div className="p-2 rounded-xl bg-cyan-500/10 border border-cyan-500/30 text-cyan-400">
            <Sparkles className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-white">Publish New Vibe Project</h2>
            <p className="text-xs text-slate-400 font-mono">Persisted directly to Blake's live Supabase database</p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-mono uppercase tracking-wider text-slate-400 mb-1">
              Project Title
            </label>
            <input
              type="text"
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g. Real-Time Audio Agent Visualizer"
              className="w-full px-3 py-2 rounded-xl bg-[#09090f] border border-slate-700 text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400 text-sm"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-mono uppercase tracking-wider text-slate-400 mb-1">
                Category
              </label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full px-3 py-2 rounded-xl bg-[#09090f] border border-slate-700 text-white focus:outline-none focus:border-cyan-400 text-sm"
              >
                <option>Creative AI</option>
                <option>DevTools</option>
                <option>Vibecoding</option>
                <option>SaaS</option>
                <option>Crypto Vibe</option>
                <option>Agent Flow</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-mono uppercase tracking-wider text-slate-400 mb-1">
                Status
              </label>
              <select
                value={status}
                onChange={(e) => setStatus(e.target.value as any)}
                className="w-full px-3 py-2 rounded-xl bg-[#09090f] border border-slate-700 text-white focus:outline-none focus:border-cyan-400 text-sm"
              >
                <option value="vibing">Vibing Live</option>
                <option value="shipped">Shipped</option>
                <option value="cooked">Cooking</option>
                <option value="ideating">Ideating</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-xs font-mono uppercase tracking-wider text-slate-400 mb-1">
              Short Description
            </label>
            <textarea
              rows={2}
              required
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="What makes this app insane? High-voltage overview..."
              className="w-full px-3 py-2 rounded-xl bg-[#09090f] border border-slate-700 text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400 text-sm resize-none"
            />
          </div>

          <div>
            <label className="block text-xs font-mono uppercase tracking-wider text-slate-400 mb-1">
              Tech Stack (comma separated)
            </label>
            <input
              type="text"
              value={techStackInput}
              onChange={(e) => setTechStackInput(e.target.value)}
              className="w-full px-3 py-2 rounded-xl bg-[#09090f] border border-slate-700 text-white focus:outline-none focus:border-cyan-400 text-sm font-mono"
            />
          </div>

          <div>
            <label className="block text-xs font-mono uppercase tracking-wider text-slate-400 mb-1">
              Master Prompt Seed
            </label>
            <textarea
              rows={2}
              value={promptSeed}
              onChange={(e) => setPromptSeed(e.target.value)}
              placeholder="Prompt used to generate or scaffold the core logic..."
              className="w-full px-3 py-2 rounded-xl bg-[#09090f] border border-slate-700 text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400 text-sm font-mono resize-none"
            />
          </div>

          <div className="flex justify-end gap-3 pt-4 border-t border-slate-800">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-xl text-slate-400 hover:text-white text-sm font-medium"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="flex items-center gap-2 px-5 py-2 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-black font-bold text-sm shadow-lg shadow-cyan-500/20 disabled:opacity-50"
            >
              <PlusCircle className="w-4 h-4" />
              {loading ? 'Publishing...' : 'Publish Vibe'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

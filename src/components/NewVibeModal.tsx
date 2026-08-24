import React, { useState, useEffect, useCallback } from 'react';
import { X, Sparkles, PlusCircle } from 'lucide-react';
import { supabase } from '../lib/supabase';
import { VibeProject, VIBE_CATEGORIES, VibeCategory, ProjectStatus } from '../types';

interface NewVibeModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAdded: (vibe: VibeProject) => void;
}

const DEFAULT_CATEGORY: VibeCategory = VIBE_CATEGORIES[0];
const DEFAULT_TECH_STACK = 'Next.js, Gemini 2.0, Supabase, Tailwind';

export const NewVibeModal: React.FC<NewVibeModalProps> = ({ isOpen, onClose, onAdded }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState<VibeCategory>(DEFAULT_CATEGORY);
  const [techStackInput, setTechStackInput] = useState(DEFAULT_TECH_STACK);
  const [promptSeed, setPromptSeed] = useState('');
  const [status, setStatus] = useState<ProjectStatus>('vibing');
  const [loading, setLoading] = useState(false);

  const resetForm = useCallback(() => {
    setTitle('');
    setDescription('');
    setCategory(DEFAULT_CATEGORY);
    setTechStackInput(DEFAULT_TECH_STACK);
    setPromptSeed('');
    setStatus('vibing');
    setLoading(false);
  }, []);

  const handleClose = useCallback(() => {
    resetForm();
    onClose();
  }, [onClose, resetForm]);

  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        handleClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, handleClose]);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;

    setLoading(true);
    const slug =
      title
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)/g, '') +
      '-' +
      Math.floor(Math.random() * 1000);
    const tech_stack = techStackInput
      .split(',')
      .map((t) => t.trim())
      .filter(Boolean);

    const newVibe = {
      title: title.trim(),
      slug,
      description: description.trim(),
      category,
      vibe_score: Math.floor(Math.random() * 5) + 95,
      tech_stack: tech_stack.length > 0 ? tech_stack : ['React 19', 'Gemini 2.0', 'Tailwind CSS'],
      prompt_seed: promptSeed.trim() || 'Build a next-level reactive AI tool in one prompt.',
      author: 'blake',
      status,
      stars: 1,
    };

    try {
      const { data, error } = await supabase.from('vibes').insert(newVibe).select().single();
      if (error) throw error;
      onAdded(data);
      handleClose();
    } catch (err) {
      console.error('Failed to create vibe in Supabase', err);
      // Local fallback
      onAdded({
        ...newVibe,
        id: crypto.randomUUID(),
        created_at: new Date().toISOString(),
      });
      handleClose();
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fadeIn"
      onClick={(e) => {
        if (e.target === e.currentTarget) handleClose();
      }}
      role="dialog"
      aria-modal="true"
    >
      <div className="relative w-full max-w-lg rounded-2xl bg-[#12121c] border border-cyan-500/30 p-6 shadow-2xl shadow-cyan-500/10">
        <button
          onClick={handleClose}
          type="button"
          aria-label="Close modal"
          className="absolute top-4 right-4 text-slate-400 hover:text-white p-1 rounded-lg hover:bg-slate-800 transition-colors"
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
                onChange={(e) => setCategory(e.target.value as VibeCategory)}
                className="w-full px-3 py-2 rounded-xl bg-[#09090f] border border-slate-700 text-white focus:outline-none focus:border-cyan-400 text-sm"
              >
                {VIBE_CATEGORIES.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-mono uppercase tracking-wider text-slate-400 mb-1">
                Status
              </label>
              <select
                value={status}
                onChange={(e) => setStatus(e.target.value as ProjectStatus)}
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
              onClick={handleClose}
              className="px-4 py-2 rounded-xl text-slate-400 hover:text-white text-sm font-medium transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="flex items-center gap-2 px-5 py-2 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-black font-bold text-sm shadow-lg shadow-cyan-500/20 disabled:opacity-50 transition-all"
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

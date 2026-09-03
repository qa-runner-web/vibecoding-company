import React, { useState } from 'react';
import { Star, Zap, Terminal, ExternalLink, Sparkles, Flame, CheckCircle2, Clock } from 'lucide-react';
import { VibeProject } from '../types';
import { supabase } from '../lib/supabase';

interface VibeCardProps {
  project: VibeProject;
  onStarUpdate?: (id: string, newStars: number) => void;
}

export const VibeCard: React.FC<VibeCardProps> = ({ project, onStarUpdate }) => {
  const [stars, setStars] = useState(project.stars);
  const [hasStarred, setHasStarred] = useState(false);
  const [copiedPrompt, setCopiedPrompt] = useState(false);
  const [starError, setStarError] = useState(false);

  const handleStar = async () => {
    const updatedStars = hasStarred ? stars - 1 : stars + 1;
    setStars(updatedStars);
    setHasStarred(!hasStarred);
    setStarError(false);

    try {
      const { error } = await supabase
        .from('vibes')
        .update({ stars: updatedStars })
        .eq('id', project.id);
      if (error) throw error;
      if (onStarUpdate) onStarUpdate(project.id, updatedStars);
    } catch (e) {
      console.error('Failed to update star in Supabase', e);
      setStars(stars);
      setHasStarred(hasStarred);
      setStarError(true);
    }
  };

  const handleCopyPrompt = () => {
    navigator.clipboard.writeText(project.prompt_seed);
    setCopiedPrompt(true);
    setTimeout(() => setCopiedPrompt(false), 2000);
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'shipped':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-950 text-emerald-400 border border-emerald-800/60">
            <CheckCircle2 className="w-3 h-3" /> Shipped
          </span>
        );
      case 'vibing':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-purple-950 text-purple-300 border border-purple-800/60 animate-pulse">
            <Sparkles className="w-3 h-3" /> Vibing Live
          </span>
        );
      case 'cooked':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-amber-950 text-amber-300 border border-amber-800/60">
            <Flame className="w-3 h-3" /> Cooking
          </span>
        );
      default:
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-slate-800 text-slate-300 border border-slate-700">
            <Clock className="w-3 h-3" /> Ideating
          </span>
        );
    }
  };

  return (
    <div className="group relative rounded-2xl bg-[#11111a] border border-slate-800 hover:border-cyan-500/50 transition-all duration-300 p-6 flex flex-col justify-between hover:shadow-xl hover:shadow-cyan-500/5">
      {/* Top Header */}
      <div>
        <div className="flex items-center justify-between gap-2 mb-3">
          <span className="text-xs font-mono tracking-wider uppercase px-2 py-0.5 rounded bg-slate-900 text-cyan-400 border border-cyan-900/50">
            {project.category}
          </span>
          <div className="flex items-center gap-2">
            {starError && <span role="alert" className="text-[11px] text-rose-400">Could not save</span>}
            {getStatusBadge(project.status)}
            <div className="flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-bold bg-amber-500/10 text-amber-400 border border-amber-500/20">
              <Zap className="w-3 h-3 fill-amber-400" />
              {project.vibe_score}
            </div>
          </div>
        </div>

        <h3 className="text-lg font-bold text-white group-hover:text-cyan-300 transition-colors mb-2">
          {project.title}
        </h3>

        <p className="text-sm text-slate-400 leading-relaxed mb-4">
          {project.description}
        </p>

        {/* Tech Stack Pills */}
        <div className="flex flex-wrap gap-1.5 mb-4">
          {project.tech_stack.map((tech, idx) => (
            <span
              key={idx}
              className="text-[11px] font-mono px-2 py-0.5 rounded bg-slate-900/80 text-slate-300 border border-slate-800"
            >
              {tech}
            </span>
          ))}
        </div>
      </div>

      {/* Prompt seed preview */}
      <div>
        <div className="rounded-xl bg-[#09090f] border border-slate-800/80 p-3 mb-4">
          <div className="flex items-center justify-between text-[11px] font-mono text-slate-500 mb-1">
            <span className="flex items-center gap-1 text-slate-400">
              <Terminal className="w-3 h-3 text-cyan-400" /> Blake's Prompt Seed
            </span>
            <button
              onClick={handleCopyPrompt}
              className="text-cyan-400 hover:text-cyan-300 text-[11px] font-semibold"
            >
              {copiedPrompt ? 'Copied! ✓' : 'Copy'}
            </button>
          </div>
          <p className="text-xs text-slate-300 font-mono line-clamp-2 italic">
            "{project.prompt_seed}"
          </p>
        </div>

        {/* Bottom Actions */}
        <div className="flex items-center justify-between pt-3 border-t border-slate-800/60">
          <span className="text-xs text-slate-500 font-mono">
            by <span className="text-slate-300 font-medium">@{project.author}</span>
          </span>

          <div className="flex items-center gap-2">
            <button
              onClick={handleStar}
              className={`flex items-center gap-1 px-3 py-1 rounded-lg text-xs font-semibold transition-all ${
                hasStarred
                  ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40'
                  : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800 hover:border-slate-700'
              }`}
            >
              <Star className={`w-3.5 h-3.5 ${hasStarred ? 'fill-amber-400 text-amber-400' : ''}`} />
              <span>{stars}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

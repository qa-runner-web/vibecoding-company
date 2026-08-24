import React, { useEffect, useState, useMemo } from 'react';
import { 
  Sparkles, 
  Zap, 
  Bot, 
  Terminal, 
  BookOpen, 
  PlusCircle, 
  Github, 
  CheckCircle2, 
  Search,
  ArrowUpDown,
  RotateCcw
} from 'lucide-react';
import { supabase } from './lib/supabase';
import { VibeProject, VIBE_CATEGORIES } from './types';
import { VibeCard } from './components/VibeCard';
import { NewVibeModal } from './components/NewVibeModal';
import { GeminiGenerator } from './components/GeminiGenerator';
import { PromptVault } from './components/PromptVault';
import { BlakePlaybook } from './components/BlakePlaybook';

const FALLBACK_VIBES: VibeProject[] = [
  {
    id: 'fallback-vibe-1',
    title: 'Aesthetic Neural Canvas',
    slug: 'neural-canvas',
    description: 'Infinite generative canvas reacting to ambient music with Gemini + WebGL shaders',
    category: 'Creative AI',
    vibe_score: 100,
    tech_stack: ['Next.js', 'Gemini 2.0', 'Three.js', 'Supabase'],
    prompt_seed: 'Generate a reactive 3D visualizer based on audio frequency harmonics',
    author: 'blake',
    status: 'shipped',
    stars: 128,
    created_at: '2026-08-23T08:54:27.234059+00:00',
  },
  {
    id: 'fallback-vibe-2',
    title: 'Agentic PR Roaster 3000',
    slug: 'pr-roaster',
    description: 'Drop a GitHub PR link and watch Gemini roast your commits in the voice of a grumpy senior dev',
    category: 'DevTools',
    vibe_score: 98,
    tech_stack: ['Next.js', 'Gemini 2.0', 'Octokit', 'Tailwind'],
    prompt_seed: 'Roast this pull request with savage technical accuracy and hilarious metaphors',
    author: 'blake',
    status: 'shipped',
    stars: 94,
    created_at: '2026-08-23T08:54:27.234059+00:00',
  },
  {
    id: 'fallback-vibe-3',
    title: 'Vibecode Maxxing Hub',
    slug: 'vibecode-maxxing',
    description: 'Blake’s command center for one-prompt full-stack apps, automated Supabase schema generation, and instant Vercel deploys',
    category: 'Vibecoding',
    vibe_score: 99,
    tech_stack: ['Next.js', 'Gemini 2.0', 'Supabase', 'Vercel'],
    prompt_seed: 'Max out development speed: prompt to live URL in under 60 seconds with zero boilerplate',
    author: 'blake',
    status: 'shipped',
    stars: 256,
    created_at: '2026-08-23T08:54:27.234059+00:00',
  },
  {
    id: 'fallback-vibe-4',
    title: 'Micro-SaaS Idea Generator',
    slug: 'saas-generator',
    description: 'Gemini analyzes high-converting niche subreddits and spits out verified high-margin SaaS specs',
    category: 'SaaS',
    vibe_score: 95,
    tech_stack: ['React', 'Gemini Flash', 'Supabase', 'Shadcn UI'],
    prompt_seed: 'Generate 3 ultra-specific B2B micro-SaaS concepts with pricing tier models',
    author: 'blake',
    status: 'vibing',
    stars: 67,
    created_at: '2026-08-23T08:54:27.234059+00:00',
  },
  {
    id: 'fallback-vibe-5',
    title: 'Solana Memecoin Analyzer',
    slug: 'sol-analyzer',
    description: 'Instant sentiment extraction across 5,000 Telegram channels and DexScreener charts',
    category: 'Crypto Vibe',
    vibe_score: 92,
    tech_stack: ['Next.js', 'Supabase Realtime', 'Gemini 2.0'],
    prompt_seed: 'Summarize telegram meme velocity and flag honeypot smart contracts',
    author: 'blake',
    status: 'ideating',
    stars: 43,
    created_at: '2026-08-23T08:54:27.234059+00:00',
  },
];

type SortOption = 'stars' | 'vibe_score' | 'newest';

export function App() {
  const [activeTab, setActiveTab] = useState<'gallery' | 'generator' | 'prompts' | 'playbook'>('gallery');
  const [vibes, setVibes] = useState<VibeProject[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState<SortOption>('stars');
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    fetchVibes();
  }, []);

  async function fetchVibes() {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('vibes')
        .select('*')
        .order('stars', { ascending: false });

      if (data && !error && data.length > 0) {
        setVibes(data);
      } else {
        setVibes(FALLBACK_VIBES);
      }
    } catch (e) {
      console.error('Error fetching vibes from Supabase, using fallback data', e);
      setVibes(FALLBACK_VIBES);
    } finally {
      setLoading(false);
    }
  }

  const handleVibeAdded = (newVibe: VibeProject) => {
    setVibes((prev) => [newVibe, ...prev]);
  };

  const categories = ['All', ...VIBE_CATEGORIES];

  const filteredVibes = useMemo(() => {
    const query = searchQuery.toLowerCase().trim();
    const result = vibes.filter((v) => {
      const matchesCategory = selectedCategory === 'All' || v.category === selectedCategory;
      const matchesSearch =
        !query ||
        v.title.toLowerCase().includes(query) ||
        v.description.toLowerCase().includes(query) ||
        (v.tech_stack && v.tech_stack.some((t) => t.toLowerCase().includes(query)));
      return matchesCategory && matchesSearch;
    });

    return result.sort((a, b) => {
      if (sortBy === 'stars') {
        return (b.stars || 0) - (a.stars || 0);
      }
      if (sortBy === 'vibe_score') {
        return (b.vibe_score || 0) - (a.vibe_score || 0);
      }
      if (sortBy === 'newest') {
        return new Date(b.created_at || 0).getTime() - new Date(a.created_at || 0).getTime();
      }
      return 0;
    });
  }, [vibes, selectedCategory, searchQuery, sortBy]);

  const totalStars = vibes.reduce((acc, v) => acc + (v.stars || 0), 0);
  const avgVibeScore =
    vibes.length > 0
      ? (vibes.reduce((acc, v) => acc + (v.vibe_score || 0), 0) / vibes.length).toFixed(1)
      : '99.0';

  return (
    <div className="min-h-screen bg-[#08080d] text-slate-100 flex flex-col selection:bg-cyan-500 selection:text-black">
      {/* Top Banner */}
      <header className="border-b border-slate-800/80 bg-[#0c0c14]/80 backdrop-blur-md sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-cyan-500 via-blue-600 to-purple-600 flex items-center justify-center shadow-lg shadow-cyan-500/20 font-black text-black text-lg">
              ⚡
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-extrabold text-lg tracking-tight text-white">VIBECODE MAXXING</span>
                <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded-full bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
                  BLAKE'S LAB
                </span>
              </div>
              <p className="text-[11px] text-slate-400 font-mono">Simulated Ara Customer Tech Station</p>
            </div>
          </div>

          {/* System Status Indicators */}
          <div className="hidden lg:flex items-center gap-3 text-xs font-mono">
            <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-950/60 text-emerald-400 border border-emerald-800/50">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
              Supabase Live
            </div>
            <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-cyan-950/60 text-cyan-400 border border-cyan-800/50">
              <Sparkles className="w-3 h-3" />
              Gemini 2.0 Flash
            </div>
            <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-purple-950/60 text-purple-300 border border-purple-800/50">
              <CheckCircle2 className="w-3 h-3" />
              Vercel Deployed
            </div>
          </div>

          <div className="flex items-center gap-2">
            <a
              href="https://github.com/qa-runner-web/blake-vibecoding"
              target="_blank"
              rel="noreferrer"
              className="p-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-white border border-slate-800 transition-all flex items-center gap-1.5 text-xs font-mono"
            >
              <Github className="w-4 h-4" />
              <span className="hidden sm:inline">GitHub</span>
            </a>
            <button
              onClick={() => setIsModalOpen(true)}
              className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-black font-bold text-xs shadow-lg shadow-cyan-500/20 transition-all"
            >
              <PlusCircle className="w-4 h-4" />
              <span>New Vibe</span>
            </button>
          </div>
        </div>
      </header>

      {/* Hero Stats */}
      <div className="bg-gradient-to-b from-[#0c0c14] to-[#08080d] border-b border-slate-800/60 py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto grid grid-cols-2 sm:grid-cols-4 gap-4">
          <div className="p-4 rounded-2xl bg-[#11111a]/60 border border-slate-800/80">
            <span className="text-xs text-slate-400 font-mono">Live Vibecodes</span>
            <div className="text-2xl font-extrabold text-white mt-1 flex items-center gap-2">
              {vibes.length} <span className="text-xs text-cyan-400 font-mono font-normal">projects</span>
            </div>
          </div>
          <div className="p-4 rounded-2xl bg-[#11111a]/60 border border-slate-800/80">
            <span className="text-xs text-slate-400 font-mono">Avg Vibe Score</span>
            <div className="text-2xl font-extrabold text-amber-400 mt-1 flex items-center gap-2">
              {avgVibeScore} <Zap className="w-4 h-4 fill-amber-400" />
            </div>
          </div>
          <div className="p-4 rounded-2xl bg-[#11111a]/60 border border-slate-800/80">
            <span className="text-xs text-slate-400 font-mono">Total Stars</span>
            <div className="text-2xl font-extrabold text-cyan-400 mt-1 flex items-center gap-2">
              {totalStars} <span className="text-xs text-slate-500 font-normal">★</span>
            </div>
          </div>
          <div className="p-4 rounded-2xl bg-[#11111a]/60 border border-slate-800/80">
            <span className="text-xs text-slate-400 font-mono">AI Model</span>
            <div className="text-2xl font-extrabold text-purple-400 mt-1 flex items-center gap-1.5 text-base sm:text-lg">
              Gemini 2.0 Flash
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="border-b border-slate-800 bg-[#0a0a10]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex space-x-1 sm:space-x-4 overflow-x-auto py-2">
          <button
            onClick={() => setActiveTab('gallery')}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all whitespace-nowrap ${
              activeTab === 'gallery'
                ? 'bg-cyan-500/10 text-cyan-400 border border-cyan-500/30'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Sparkles className="w-4 h-4" />
            ⚡ Live Vibes Gallery ({vibes.length})
          </button>
          <button
            onClick={() => setActiveTab('generator')}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all whitespace-nowrap ${
              activeTab === 'generator'
                ? 'bg-cyan-500/10 text-cyan-400 border border-cyan-500/30'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Bot className="w-4 h-4" />
            🧠 Gemini Vibe Generator
          </button>
          <button
            onClick={() => setActiveTab('prompts')}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all whitespace-nowrap ${
              activeTab === 'prompts'
                ? 'bg-cyan-500/10 text-cyan-400 border border-cyan-500/30'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Terminal className="w-4 h-4" />
            📜 Blake's Prompt Vault
          </button>
          <button
            onClick={() => setActiveTab('playbook')}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all whitespace-nowrap ${
              activeTab === 'playbook'
                ? 'bg-cyan-500/10 text-cyan-400 border border-cyan-500/30'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <BookOpen className="w-4 h-4" />
            🛠️ Blake's Tech Playbook
          </button>
        </div>
      </div>

      {/* Main Content Area */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 flex-1 w-full">
        {activeTab === 'gallery' && (
          <div className="space-y-6">
            {/* Filter & Search & Sort Bar */}
            <div className="flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-4">
              {/* Category Pills */}
              <div className="flex items-center gap-1.5 overflow-x-auto pb-2 lg:pb-0">
                {categories.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    className={`px-3 py-1.5 rounded-xl text-xs font-mono transition-all whitespace-nowrap ${
                      selectedCategory === cat
                        ? 'bg-white text-black font-bold shadow-md'
                        : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>

              {/* Controls: Search and Sort */}
              <div className="flex flex-col sm:flex-row items-center gap-3">
                <div className="relative w-full sm:w-64">
                  <Search className="w-4 h-4 absolute left-3 top-2.5 text-slate-500" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search vibes, stack, prompts..."
                    className="w-full pl-9 pr-3 py-1.5 rounded-xl bg-slate-900 border border-slate-800 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400"
                  />
                </div>

                <div className="flex items-center gap-2 w-full sm:w-auto">
                  <ArrowUpDown className="w-4 h-4 text-slate-500 hidden sm:block" />
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value as SortOption)}
                    aria-label="Sort projects"
                    className="w-full sm:w-auto px-3 py-1.5 rounded-xl bg-slate-900 border border-slate-800 text-xs font-mono text-cyan-400 focus:outline-none focus:border-cyan-400"
                  >
                    <option value="stars">★ Most Stars</option>
                    <option value="vibe_score">⚡ Highest Vibe Score</option>
                    <option value="newest">🕒 Newest</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Grid */}
            {loading ? (
              <div className="flex items-center justify-center py-20">
                <Sparkles className="w-8 h-8 text-cyan-400 animate-spin" />
              </div>
            ) : filteredVibes.length === 0 ? (
              <div className="text-center py-16 bg-[#11111a] rounded-2xl border border-slate-800 space-y-3">
                <p className="text-slate-400 font-mono text-sm">No vibe projects found matching filter.</p>
                {(selectedCategory !== 'All' || searchQuery) && (
                  <button
                    onClick={() => {
                      setSelectedCategory('All');
                      setSearchQuery('');
                    }}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-900 text-cyan-400 text-xs font-mono border border-slate-800 hover:border-cyan-500/40 transition-colors"
                  >
                    <RotateCcw className="w-3.5 h-3.5" /> Reset Filters
                  </button>
                )}
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredVibes.map((project) => (
                  <VibeCard
                    key={project.id}
                    project={project}
                    onStarUpdate={(id, newStars) => {
                      setVibes((prev) =>
                        prev.map((v) => (v.id === id ? { ...v, stars: newStars } : v))
                      );
                    }}
                  />
                ))}
              </div>
            )}
          </div>
        )}

        {activeTab === 'generator' && <GeminiGenerator />}
        {activeTab === 'prompts' && <PromptVault />}
        {activeTab === 'playbook' && <BlakePlaybook />}
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-800/80 bg-[#0a0a10] py-6 px-4 text-center text-xs font-mono text-slate-500">
        <p>
          Vibecode Maxxing Hub • Built by <span className="text-cyan-400">Blake</span> (qa-runner@ara.so) • Supabase + Gemini + Vercel + Ara SWE Agent
        </p>
      </footer>

      {/* Modal */}
      <NewVibeModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onAdded={handleVibeAdded}
      />
    </div>
  );
}
export default App;

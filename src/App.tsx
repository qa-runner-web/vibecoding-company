import React, { useEffect, useState } from 'react';
import { 
  Sparkles, 
  Zap, 
  Flame, 
  Bot, 
  Terminal, 
  BookOpen, 
  PlusCircle, 
  Github, 
  ExternalLink, 
  Database, 
  CheckCircle2, 
  Radio,
  Search,
  Filter
} from 'lucide-react';
import { supabase } from './lib/supabase';
import { VibeProject } from './types';
import { VibeCard } from './components/VibeCard';
import { NewVibeModal } from './components/NewVibeModal';
import { GeminiGenerator } from './components/GeminiGenerator';
import { PromptVault } from './components/PromptVault';
import { BlakePlaybook } from './components/BlakePlaybook';

export function App() {
  const [activeTab, setActiveTab] = useState<'gallery' | 'generator' | 'prompts' | 'playbook'>('gallery');
  const [vibes, setVibes] = useState<VibeProject[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
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

      if (data && !error) {
        setVibes(data);
      }
    } catch (e) {
      console.error('Error fetching vibes', e);
    } finally {
      setLoading(false);
    }
  }

  const handleVibeAdded = (newVibe: VibeProject) => {
    setVibes((prev) => [newVibe, ...prev]);
  };

  const categories = ['All', 'Creative AI', 'DevTools', 'Vibecoding', 'SaaS', 'Crypto Vibe'];

  const filteredVibes = vibes.filter((v) => {
    const matchesCategory = selectedCategory === 'All' || v.category === selectedCategory;
    const matchesSearch =
      v.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      v.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      v.tech_stack.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  const totalStars = vibes.reduce((acc, v) => acc + (v.stars || 0), 0);
  const avgVibeScore = vibes.length > 0 ? (vibes.reduce((acc, v) => acc + v.vibe_score, 0) / vibes.length).toFixed(1) : '99.0';

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
            {/* Filter & Search Bar */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-1.5 overflow-x-auto w-full sm:w-auto pb-2 sm:pb-0">
                {categories.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    className={`px-3 py-1.5 rounded-xl text-xs font-mono transition-all whitespace-nowrap ${
                      selectedCategory === cat
                        ? 'bg-white text-black font-bold'
                        : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>

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
            </div>

            {/* Grid */}
            {loading ? (
              <div className="flex items-center justify-center py-20">
                <Sparkles className="w-8 h-8 text-cyan-400 animate-spin" />
              </div>
            ) : filteredVibes.length === 0 ? (
              <div className="text-center py-16 bg-[#11111a] rounded-2xl border border-slate-800">
                <p className="text-slate-400 font-mono text-sm">No vibe projects found matching filter.</p>
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

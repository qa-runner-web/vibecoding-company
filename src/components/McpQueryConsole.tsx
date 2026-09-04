import React, { useState } from 'react';
import { AlertTriangle, ArrowRight, Check, Clipboard, Database, Eye, LockKeyhole, Play, Terminal } from 'lucide-react';

type QueryResult = {
  id: string;
  tool: string;
  status: string;
  owner: string;
};

const sampleResults: QueryResult[] = [
  { id: 'run_7f2a', tool: 'repo.search', status: 'completed', owner: 'blake' },
  { id: 'run_7f29', tool: 'repo.search', status: 'completed', owner: 'blake' },
  { id: 'run_7f28', tool: 'repo.search', status: 'completed', owner: 'blake' },
];

export const McpQueryConsole: React.FC = () => {
  const [query, setQuery] = useState('find recent repository checks');
  const [hasRun, setHasRun] = useState(false);
  const [copied, setCopied] = useState(false);

  const nextStep = `Read-only follow-up: request the next page for ${query} using cursor cur_8c1f.`;

  const copyNextStep = async () => {
    await navigator.clipboard.writeText(nextStep);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1600);
  };

  return (
    <div className="space-y-6">
      <section className="rounded-2xl border border-cyan-500/30 bg-gradient-to-br from-[#151522] via-[#10101a] to-[#0d0d15] p-6 shadow-xl md:p-8">
        <div className="mb-6 flex flex-col justify-between gap-4 md:flex-row md:items-start">
          <div>
            <div className="mb-3 flex items-center gap-3">
              <div className="rounded-2xl border border-cyan-500/30 bg-cyan-500/10 p-3 text-cyan-400"><Terminal className="h-6 w-6" /></div>
              <div>
                <h2 className="text-2xl font-extrabold text-white">MCP Query Console</h2>
                <p className="text-sm text-slate-400">Bounded reads with explicit pagination handoff.</p>
              </div>
            </div>
            <div className="flex flex-wrap items-center gap-2 text-[11px] font-mono">
              <span className="flex items-center gap-1.5 rounded-full border border-emerald-800/60 bg-emerald-950/50 px-2.5 py-1 text-emerald-400"><LockKeyhole className="h-3 w-3" /> READ-ONLY</span>
              <span className="flex items-center gap-1.5 rounded-full border border-slate-700 bg-slate-900 px-2.5 py-1 text-slate-400"><Database className="h-3 w-3" /> MCP / repo.search</span>
            </div>
          </div>
          <span className="flex items-center gap-1.5 text-xs font-mono text-slate-500"><Eye className="h-3.5 w-3.5" /> No automatic paging</span>
        </div>

        <div className="flex flex-col gap-3 sm:flex-row">
          <label className="sr-only" htmlFor="mcp-query">Query</label>
          <input id="mcp-query" value={query} onChange={(event) => setQuery(event.target.value)} className="min-w-0 flex-1 rounded-xl border border-slate-700 bg-[#09090f] px-4 py-3 text-sm text-white placeholder-slate-500 focus:border-cyan-400 focus:outline-none" />
          <div className="flex items-center rounded-xl border border-slate-700 bg-slate-900 px-3 py-3 text-xs font-mono text-slate-400">Limit: 3</div>
          <button onClick={() => setHasRun(true)} className="flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 px-5 py-3 text-sm font-bold text-black shadow-lg shadow-cyan-500/20 transition hover:from-cyan-400 hover:to-blue-500"><Play className="h-4 w-4" /> Run bounded query</button>
        </div>
      </section>

      {hasRun && (
        <section className="overflow-hidden rounded-2xl border border-slate-800 bg-[#11111a]">
          <div className="flex flex-col gap-2 border-b border-slate-800 px-6 py-4 sm:flex-row sm:items-center sm:justify-between">
            <div><p className="text-sm font-bold text-white">Query response</p><p className="font-mono text-xs text-slate-500">repo.search · limit=3 · 142ms</p></div>
            <span className="rounded-full border border-amber-500/30 bg-amber-500/10 px-3 py-1 text-xs font-mono font-bold text-amber-300">PARTIAL RESULT</span>
          </div>
          <div className="divide-y divide-slate-800/80">
            {sampleResults.map((result) => (
              <div key={result.id} className="grid grid-cols-[1fr_auto] items-center gap-4 px-6 py-4 sm:grid-cols-[1fr_1fr_auto]">
                <div><p className="font-mono text-sm text-cyan-300">{result.id}</p><p className="text-xs text-slate-500">{result.tool}</p></div>
                <p className="hidden text-xs text-slate-400 sm:block">owner: <span className="text-slate-200">{result.owner}</span></p>
                <span className="text-xs font-mono text-emerald-400">{result.status}</span>
              </div>
            ))}
          </div>
          <div className="border-t border-amber-500/20 bg-amber-950/20 px-6 py-5">
            <div className="flex gap-3">
              <AlertTriangle className="mt-0.5 h-5 w-5 shrink-0 text-amber-400" />
              <div className="min-w-0 flex-1"><p className="text-sm font-bold text-amber-200">This bounded read returned 3 of 8 matches.</p><p className="mt-1 text-sm leading-relaxed text-amber-100/70">A pagination marker was returned: <code className="rounded bg-black/30 px-1.5 py-0.5 font-mono text-amber-300">cur_8c1f</code>. No additional page was requested.</p><div className="mt-4 rounded-xl border border-amber-500/20 bg-black/20 p-3"><p className="mb-2 text-[11px] font-mono uppercase tracking-wider text-amber-400/70">Next read-only step</p><p className="text-sm text-slate-200">{nextStep}</p></div><button onClick={copyNextStep} className="mt-3 flex items-center gap-2 text-xs font-mono text-amber-300 hover:text-amber-100">{copied ? <Check className="h-3.5 w-3.5" /> : <Clipboard className="h-3.5 w-3.5" />}{copied ? 'Copied follow-up' : 'Copy suggested follow-up'} <ArrowRight className="h-3.5 w-3.5" /></button></div>
            </div>
          </div>
        </section>
      )}
    </div>
  );
};

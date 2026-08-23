import React from 'react';
import { Cpu, Rocket, ShieldCheck, Zap, Terminal, Database, Server, GitBranch } from 'lucide-react';

export const BlakePlaybook: React.FC = () => {
  return (
    <div className="space-y-6">
      <div className="rounded-2xl bg-gradient-to-r from-purple-950/40 via-slate-900 to-cyan-950/40 border border-purple-500/30 p-6 md:p-8">
        <h2 className="text-2xl font-black text-white flex items-center gap-3 mb-2">
          <Zap className="w-6 h-6 text-amber-400" />
          The Blake Vibecoding Playbook
        </h2>
        <p className="text-sm text-slate-300 leading-relaxed max-w-3xl">
          How Blake ships production software at 10x speed with zero boilerplate using Gemini 2.0 Flash, Supabase PostgreSQL, Vercel Edge, and Ara autonomous software agents.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="rounded-2xl bg-[#11111a] border border-slate-800 p-6 space-y-3">
          <div className="p-3 rounded-xl bg-cyan-500/10 text-cyan-400 w-fit">
            <Cpu className="w-6 h-6" />
          </div>
          <h3 className="text-lg font-bold text-white">1. Gemini 2.0 Flash Inference</h3>
          <p className="text-xs text-slate-400 leading-relaxed">
            Free tier Google Generative Language API delivering sub-500ms reasoning across complex UI states, PostgreSQL schemas, and full-stack architectures.
          </p>
          <div className="text-[11px] font-mono text-cyan-400 bg-slate-900/80 p-2 rounded-lg border border-slate-800">
            Endpoint: generativelanguage.googleapis.com
          </div>
        </div>

        <div className="rounded-2xl bg-[#11111a] border border-slate-800 p-6 space-y-3">
          <div className="p-3 rounded-xl bg-emerald-500/10 text-emerald-400 w-fit">
            <Database className="w-6 h-6" />
          </div>
          <h3 className="text-lg font-bold text-white">2. Supabase Cloud Postgres</h3>
          <p className="text-xs text-slate-400 leading-relaxed">
            Live database cluster (<code className="text-emerald-300">bsixukbiydmwffyqqrxm</code>) with instant REST API, RLS security policies, and typed TypeScript bindings.
          </p>
          <div className="text-[11px] font-mono text-emerald-400 bg-slate-900/80 p-2 rounded-lg border border-slate-800">
            Project: blake-vibecoding
          </div>
        </div>

        <div className="rounded-2xl bg-[#11111a] border border-slate-800 p-6 space-y-3">
          <div className="p-3 rounded-xl bg-purple-500/10 text-purple-400 w-fit">
            <Server className="w-6 h-6" />
          </div>
          <h3 className="text-lg font-bold text-white">3. Vercel Global Edge & Git</h3>
          <p className="text-xs text-slate-400 leading-relaxed">
            Automatic zero-configuration edge deployments on git push. Published to GitHub under <code className="text-purple-300">qa-runner-web/blake-vibecoding</code>.
          </p>
          <div className="text-[11px] font-mono text-purple-400 bg-slate-900/80 p-2 rounded-lg border border-slate-800">
            Domain: vibecode-maxxing.vercel.app
          </div>
        </div>
      </div>

      <div className="rounded-2xl bg-[#11111a] border border-slate-800 p-6">
        <h3 className="text-lg font-bold text-white flex items-center gap-2 mb-4">
          <Terminal className="w-5 h-5 text-cyan-400" />
          Blake's Ara Agent Integration Stack
        </h3>
        <div className="bg-[#09090f] p-4 rounded-xl border border-slate-800 font-mono text-xs text-slate-300 space-y-2">
          <p className="text-slate-500">// Simulated Customer Persona Setup for Ara</p>
          <p><span className="text-cyan-400">Identity:</span> Blake &lt;qa-runner@ara.so&gt;</p>
          <p><span className="text-purple-400">GitHub Remote:</span> https://github.com/qa-runner-web/blake-vibecoding</p>
          <p><span className="text-emerald-400">Database:</span> https://bsixukbiydmwffyqqrxm.supabase.co</p>
          <p><span className="text-amber-400">AI Model:</span> Google Gemini 2.0 Flash (Free API Key)</p>
          <p><span className="text-blue-400">Slack Workspace:</span> Ara (#vibecoding-lounge, #agentic-builds, #general)</p>
        </div>
      </div>
    </div>
  );
};

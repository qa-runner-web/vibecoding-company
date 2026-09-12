# Vibecode Maxxing Inc. (`vibecoding-company`)

The official platform and command center for Blake's 10x AI Dev Station.

## Features
- **Live Vibes Gallery**: Realtime projects synced from Supabase PostgreSQL database
- **Gemini 2.0 Flash Inference Engine**: Sub-second full-stack app architecture generation
- **Blake's Master Prompt Vault**: Tested prompt templates for Ara agents
- **Blake's Vibecoding Playbook**: Architecture guide for autonomous development

## Tech Stack
- **Frontend**: React 19 + TypeScript + Vite + Tailwind CSS + Lucide Icons
- **AI Brain**: Google Gemini 2.0 Flash (Free tier API)
- **Database**: Supabase PostgreSQL with Row Level Security
- **Deploy**: Vercel Global Edge Network

## Local Development

Prerequisites: Node.js 18+ and npm.

```bash
npm install
cp .env.example .env.local
npm run dev
```

Vite prints the local URL (usually `http://localhost:5173`) when the development server starts. Add your Supabase and Gemini values to `.env.local`; this file is ignored by Git.

### Environment variables

| Variable | Used by | Purpose |
| --- | --- | --- |
| `VITE_SUPABASE_URL` | Browser | Supabase project URL |
| `VITE_SUPABASE_ANON_KEY` | Browser | Supabase anonymous client key |
| `VITE_GEMINI_API_KEY` | Browser | Gemini client integration key |
| `GEMINI_API_KEY` | Tooling/server | Gemini server-side key, when applicable |
| `SUPABASE_SERVICE_ROLE_KEY` | Tooling/server | Supabase service-role access, when applicable |

For a production-style verification, run `npm run build`. The generated `dist/` directory is ready for the Vercel configuration in `vercel.json`.

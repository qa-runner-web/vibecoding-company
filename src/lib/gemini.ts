import { supabase } from './supabase';

const GEMINI_API_KEY = import.meta.env.VITE_GEMINI_API_KEY || '';

export class ProviderResponseShapeError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'ProviderResponseShapeError';
  }
}

export async function generateVibeWithGemini(
  prompt: string,
  style: string = '10x Speedrun'
): Promise<{ text: string; vibeScore: number; techStack: string[] }> {
  const systemInstruction = `You are Blake's 10x Vibecoding Engine. You turn raw concepts into maximum-vibe software blueprints.
Style preset: ${style}.
Return a structured, ultra-inspiring breakdown containing:
1. 🔥 The Vibe Concept (high-voltage 1-liner)
2. ⚡ Architecture & Tech Stack (React/Next, Supabase, Tailwind, Gemini, Vercel, Ara Agent)
3. 🚀 Core Prompt to feed into an AI coding agent
4. 💎 Killer Feature that makes it viral
5. 📈 1-day ship timeline`;

  try {
    if (!GEMINI_API_KEY) {
      return getFallbackGeneration(prompt, style);
    }

    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${GEMINI_API_KEY}`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          contents: [
            {
              role: 'user',
              parts: [{ text: `${systemInstruction}\n\nUser Idea: ${prompt}` }]
            }
          ],
          generationConfig: {
            temperature: 0.85,
            topP: 0.95,
            maxOutputTokens: 1024,
          }
        })
      }
    );

    if (!response.ok) {
      return getFallbackGeneration(prompt, style);
    }

    const data: unknown = await response.json();
    const candidateText = getCandidateText(data);

    if (!candidateText) {
      throw new ProviderResponseShapeError(
        'Gemini response mismatch: expected candidates[0].content.parts[0].text to be a non-empty string.'
      );
    }

    try {
      await supabase.from('generations').insert({
        prompt,
        result: candidateText,
        model: 'gemini-2.0-flash',
        vibe_rating: 'MAXIMUM VIBES 🔥'
      });
    } catch (e) {
      console.error('Failed to log generation to Supabase', e);
    }

    return {
      text: candidateText,
      vibeScore: Math.floor(Math.random() * 6) + 94,
      techStack: ['React 19', 'Gemini 2.0', 'Supabase', 'Tailwind CSS', 'Vercel']
    };
  } catch (error) {
    if (error instanceof ProviderResponseShapeError) {
      console.error(error.message, error);
      throw error;
    }

    console.error('Error generating vibe:', error);
    return getFallbackGeneration(prompt, style);
  }
}

function getCandidateText(data: unknown): string | null {
  if (!data || typeof data !== 'object') return null;

  const candidates = (data as { candidates?: unknown }).candidates;
  if (!Array.isArray(candidates) || candidates.length === 0) return null;

  const content = candidates[0] && typeof candidates[0] === 'object'
    ? (candidates[0] as { content?: unknown }).content
    : null;
  const parts = content && typeof content === 'object'
    ? (content as { parts?: unknown }).parts
    : null;
  const text = Array.isArray(parts) && parts[0] && typeof parts[0] === 'object'
    ? (parts[0] as { text?: unknown }).text
    : null;

  return typeof text === 'string' && text.trim() ? text : null;
}

function getFallbackGeneration(prompt: string, style: string) {
  const result = `### ⚡ Blake's Vibecoded Architecture: "${prompt}"

**1. 🔥 The Vibe Concept**
An autonomous high-velocity micro-app built in one session, wired with live Supabase persistence and Gemini AI streaming.

**2. ⚡ Tech Stack**
- **Frontend**: Next.js 15 / React 19 + Tailwind CSS + Lucide Icons
- **AI Brain**: Google Gemini 2.0 Flash (sub-second latency inference)
- **Database**: Supabase PostgreSQL with instant RLS + Realtime subscriptions
- **Deployment**: Vercel Edge Network
- **Agent Orchestrator**: Ara Digital Twin Agent Loop

**3. 🚀 The Master Prompt**
> "Build a full-stack reactive workspace for ${prompt}. Implement instant client-side state, persist everything in Supabase via typed client, stream answers using Gemini 2.0 Flash, and deploy live to Vercel with zero friction."

**4. 💎 Killer Feature**
Instant zero-config sharing with live multiplayer cursor sync and automatic preview sandbox.

**5. 📈 1-Day Ship Plan**
- **Hour 0-1**: Initialize repo with Ara & Supabase schema.
- **Hour 1-2**: Scaffold reactive UI with Tailwind & Lucide.
- **Hour 2-3**: Connect Gemini Flash API & Supabase tables.
- **Hour 4**: Deploy to Vercel and post viral announcement thread.`;

  return {
    text: result,
    vibeScore: 99,
    techStack: ['React 19', 'Gemini 2.0 Flash', 'Supabase', 'Tailwind', 'Vercel']
  };
}

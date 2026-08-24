export const VIBE_CATEGORIES = [
  'Creative AI',
  'DevTools',
  'Vibecoding',
  'SaaS',
  'Crypto Vibe',
  'Agent Flow',
] as const;

export type VibeCategory = typeof VIBE_CATEGORIES[number];

export type ProjectStatus = 'shipped' | 'vibing' | 'cooked' | 'ideating';

export interface VibeProject {
  id: string;
  title: string;
  slug: string;
  description: string;
  category: string;
  vibe_score: number;
  tech_stack: string[];
  prompt_seed: string;
  author: string;
  status: ProjectStatus;
  stars: number;
  created_at: string;
}

export interface PromptTemplate {
  id: string;
  title: string;
  model: string;
  system_prompt: string;
  user_prompt: string;
  output_example: string;
  tags: string[];
  likes: number;
  created_at: string;
}

export interface GenerationRecord {
  id: string;
  prompt: string;
  result: string;
  model: string;
  vibe_rating: string;
  created_at: string;
}

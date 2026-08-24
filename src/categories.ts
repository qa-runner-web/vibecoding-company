export const VIBE_CATEGORIES = [
  'Creative AI',
  'DevTools',
  'Vibecoding',
  'SaaS',
  'Crypto Vibe',
  'Agent Flow',
] as const;

export type VibeCategory = (typeof VIBE_CATEGORIES)[number];

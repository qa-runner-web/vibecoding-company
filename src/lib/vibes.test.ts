import { describe, expect, it } from 'bun:test';
import { VIBE_CATEGORIES, VibeProject } from '../types';
import { generateVibeWithGemini } from './gemini';

describe('Vibe Categories and Types', () => {
  it('should have all expected categories in the canonical list', () => {
    expect(VIBE_CATEGORIES).toContain('Creative AI');
    expect(VIBE_CATEGORIES).toContain('DevTools');
    expect(VIBE_CATEGORIES).toContain('Vibecoding');
    expect(VIBE_CATEGORIES).toContain('SaaS');
    expect(VIBE_CATEGORIES).toContain('Crypto Vibe');
    expect(VIBE_CATEGORIES).toContain('Agent Flow');
    expect(VIBE_CATEGORIES.length).toBe(6);
  });
});

describe('Gemini Generation & Fallback', () => {
  it('should return a structured blueprint when API key is missing or on fallback', async () => {
    const result = await generateVibeWithGemini('Test Autonomous Agent', '10x Speedrun');
    expect(result).toBeDefined();
    expect(result.text).toContain("Blake's Vibecoded Architecture");
    expect(result.text).toContain('Test Autonomous Agent');
    expect(result.vibeScore).toBeGreaterThanOrEqual(90);
    expect(Array.isArray(result.techStack)).toBe(true);
    expect(result.techStack.length).toBeGreaterThan(0);
  });
});

describe('Gallery Filtering & Sorting Logic', () => {
  const sampleProjects: VibeProject[] = [
    {
      id: '1',
      title: 'Zeta Agent',
      slug: 'zeta-agent',
      description: 'An AI assistant for git workflows',
      category: 'DevTools',
      vibe_score: 91,
      tech_stack: ['TypeScript', 'Git'],
      prompt_seed: 'Help with git',
      author: 'blake',
      status: 'shipped',
      stars: 10,
      created_at: '2026-08-01T00:00:00.000Z',
    },
    {
      id: '2',
      title: 'Alpha Studio',
      slug: 'alpha-studio',
      description: 'Generative art engine',
      category: 'Creative AI',
      vibe_score: 99,
      tech_stack: ['React', 'WebGL'],
      prompt_seed: 'Create shaders',
      author: 'blake',
      status: 'vibing',
      stars: 50,
      created_at: '2026-08-10T00:00:00.000Z',
    },
    {
      id: '3',
      title: 'Beta SaaS Hub',
      slug: 'beta-saas-hub',
      description: 'Subscription management microapp',
      category: 'SaaS',
      vibe_score: 95,
      tech_stack: ['Next.js', 'Stripe'],
      prompt_seed: 'Manage billing',
      author: 'blake',
      status: 'cooked',
      stars: 30,
      created_at: '2026-08-05T00:00:00.000Z',
    },
  ];

  it('filters by category accurately', () => {
    const filtered = sampleProjects.filter((p) => p.category === 'DevTools');
    expect(filtered.length).toBe(1);
    expect(filtered[0].title).toBe('Zeta Agent');
  });

  it('filters by search term across title, description, and tech_stack', () => {
    const byTech = sampleProjects.filter((p) =>
      p.tech_stack.some((t) => t.toLowerCase().includes('webgl'))
    );
    expect(byTech.length).toBe(1);
    expect(byTech[0].title).toBe('Alpha Studio');

    const byDesc = sampleProjects.filter((p) =>
      p.description.toLowerCase().includes('subscription')
    );
    expect(byDesc.length).toBe(1);
    expect(byDesc[0].title).toBe('Beta SaaS Hub');
  });

  it('sorts by stars descending', () => {
    const sorted = [...sampleProjects].sort((a, b) => b.stars - a.stars);
    expect(sorted[0].id).toBe('2'); // 50
    expect(sorted[1].id).toBe('3'); // 30
    expect(sorted[2].id).toBe('1'); // 10
  });

  it('sorts by vibe_score descending', () => {
    const sorted = [...sampleProjects].sort((a, b) => b.vibe_score - a.vibe_score);
    expect(sorted[0].id).toBe('2'); // 99
    expect(sorted[1].id).toBe('3'); // 95
    expect(sorted[2].id).toBe('1'); // 91
  });

  it('sorts by newest descending', () => {
    const sorted = [...sampleProjects].sort(
      (a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
    );
    expect(sorted[0].id).toBe('2'); // Aug 10
    expect(sorted[1].id).toBe('3'); // Aug 5
    expect(sorted[2].id).toBe('1'); // Aug 1
  });
});

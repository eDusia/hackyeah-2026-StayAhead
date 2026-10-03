import type { MarketTrend } from '@/types';

export const marketTrends: MarketTrend[] = [
  {
    id: 'trend-ai-agents',
    skill: 'AI Agents',
    demandScore: 94,
    growthPercent: 68,
    category: 'AI',
    summary: 'Firmy szukają osób, które potrafią projektować i wdrażać autonomicznych agentów do procesów biznesowych.',
  },
  {
    id: 'trend-typescript',
    skill: 'TypeScript',
    demandScore: 91,
    growthPercent: 22,
    category: 'Software',
    summary: 'TypeScript pozostaje standardem w aplikacjach produktowych i fullstackowych rolach mid/senior.',
  },
  {
    id: 'trend-system-design',
    skill: 'System Design',
    demandScore: 87,
    growthPercent: 31,
    category: 'Architecture',
    summary: 'Umiejętność projektowania skalowalnych systemów jest kluczowa przy awansie do ról senior.',
  },
  {
    id: 'trend-product-sense',
    skill: 'Product Sense',
    demandScore: 79,
    growthPercent: 18,
    category: 'Product',
    summary: 'Łączenie kompetencji technicznych z myśleniem produktowym zwiększa dopasowanie do ról AI Product.',
  },
];

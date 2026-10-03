import type { CareerDomain, SkillLevel, TaskCategory, TaskDifficulty } from '@/types';

export const colors = {
  // Dark theme surfaces
  bgDark: '#020617', // slate-950
  bgDarkAlt: '#090d16',
  cardDark: 'rgba(15, 23, 42, 0.82)', // slate-900 with glass opacity
  cardBorder: 'rgba(51, 65, 85, 0.6)', // slate-700/800 border
  surfaceHover: 'rgba(30, 41, 59, 0.7)',

  // Brand / AI Accents
  primary: '#6366f1', // indigo-500
  primaryHover: '#4f46e5',
  primarySoft: 'rgba(99, 102, 241, 0.15)',
  aiPurple: '#9333ea',
  aiGradient: ['#6366f1', '#9333ea'] as const,

  // Success & Highlights (Apple Health / Linear lime & emerald)
  emerald: '#34d399',
  emeraldSoft: 'rgba(16, 185, 129, 0.15)',
  lime: '#a3e635',
  success: '#10b981',
  warning: '#f59e0b',
  warningSoft: 'rgba(245, 158, 11, 0.15)',

  // Typography & Neutrals
  slate50: '#f8fafc',
  slate100: '#f1f5f9',
  slate200: '#e2e8f0',
  slate400: '#94a3b8',
  slate500: '#64748b',
  slate600: '#475569',
  slate700: '#334155',
  slate800: '#1e293b',
  slate900: '#0f172a',
  slate950: '#020617',
  white: '#ffffff',
} as const;

export const fonts = {
  heading: 'System',
  body: 'System',
} as const;

export const SKILL_LEVEL_LABELS: Record<SkillLevel, string> = {
  beginner: 'Początkujący',
  intermediate: 'Średniozaawansowany',
  advanced: 'Zaawansowany',
  expert: 'Ekspert',
};

export const CAREER_DOMAIN_LABELS: Record<CareerDomain, string> = {
  software: 'Software Engineering',
  data: 'Data & Analytics',
  product: 'Product Management',
  design: 'UX / Product Design',
  ai: 'AI & Machine Learning',
  other: 'Inna ścieżka',
};

export const TASK_CATEGORY_LABELS: Record<TaskCategory, string> = {
  learning: 'Nauka',
  practice: 'Praktyka',
  networking: 'Networking',
  application: 'Aplikowanie',
  reflection: 'Refleksja',
};

export const TASK_DIFFICULTY_LABELS: Record<TaskDifficulty, string> = {
  easy: 'Łatwe',
  medium: 'Średnie',
  hard: 'Trudne',
};

export const DEFAULT_STREAK = 4;
export const WEEKLY_GOAL_HOURS = 6;

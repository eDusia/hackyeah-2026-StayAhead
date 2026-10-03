import type { CareerDomain, SkillLevel, TaskCategory, TaskDifficulty } from '@/types';

export const colors = {
  primary: '#4f46e5',
  primarySoft: '#eef2ff',
  slate50: '#f8fafc',
  slate100: '#f1f5f9',
  slate400: '#94a3b8',
  slate600: '#475569',
  slate900: '#0f172a',
  success: '#0d9488',
  warning: '#d97706',
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

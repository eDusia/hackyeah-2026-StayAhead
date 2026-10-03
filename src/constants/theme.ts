import type { Ionicons } from '@expo/vector-icons';

import type {
  CareerDomain,
  GoalType,
  SkillLevel,
  TaskCategory,
  TaskDifficulty,
  TimeCommitment,
} from '@/types';

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
  other: 'Inny obszar',
};

export interface GoalTypeOption {
  id: GoalType;
  label: string;
  description: string;
  icon: keyof typeof Ionicons.glyphMap;
}

export const GOAL_TYPE_OPTIONS: GoalTypeOption[] = [
  {
    id: 'return_after_break',
    label: 'Powrót do pracy po przerwie',
    description: 'Wracam na rynek i chcę zaktualizować kluczowe kompetencje.',
    icon: 'refresh-outline',
  },
  {
    id: 'parental_leave',
    label: 'Powrót po urlopie rodzicielskim',
    description: 'Uporządkowany, spokojny powrót do aktywności zawodowej w dogodnym tempie.',
    icon: 'heart-outline',
  },
  {
    id: 'career_change',
    label: 'Zmiana ścieżki kariery',
    description: 'Przebranżowienie lub wejście w zupełnie nową rolę w IT / Digital.',
    icon: 'compass-outline',
  },
  {
    id: 'promotion',
    label: 'Awans lub nowe technologie',
    description: 'Wyższy poziom, nowsze narzędzia i mocniejsza pozycja na rynku.',
    icon: 'trending-up-outline',
  },
  {
    id: 'other',
    label: 'Inny cel zawodowy',
    description: 'Własny plan i spersonalizowana ścieżka rozwoju.',
    icon: 'sparkles-outline',
  },
];

export const GOAL_TYPE_LABELS: Record<GoalType, string> = {
  return_after_break: 'Powrót do pracy po przerwie',
  parental_leave: 'Powrót po urlopie rodzicielskim',
  career_change: 'Zmiana ścieżki kariery',
  promotion: 'Awans / Nowe technologie',
  other: 'Inny cel zawodowy',
};

export interface TimeCommitmentOption {
  id: TimeCommitment;
  label: string;
  subtitle: string;
  hoursPerWeek: number;
  icon: keyof typeof Ionicons.glyphMap;
}

export const TIME_COMMITMENT_OPTIONS: TimeCommitmentOption[] = [
  {
    id: '15-30m_daily',
    label: '15–30 min dziennie',
    subtitle: 'Mikronawyki, czytanie i 1 krótkie zadanie dziennie',
    hoursPerWeek: 3,
    icon: 'cafe-outline',
  },
  {
    id: '1h_daily',
    label: '1 godzina dziennie',
    subtitle: 'Równomierny, codzienny postęp i stały kontakt z wiedzą',
    hoursPerWeek: 7,
    icon: 'alarm-outline',
  },
  {
    id: '3-5h_weekly',
    label: '3–5 godzin tygodniowo',
    subtitle: 'Głównie weekendy lub 2-3 wybrane bloki w tygodniu',
    hoursPerWeek: 4,
    icon: 'calendar-outline',
  },
  {
    id: '8-10h_weekly',
    label: '8–10 godzin tygodniowo',
    subtitle: 'Intensywny sprint w stronę nowej roli lub szybkiego powrotu',
    hoursPerWeek: 9,
    icon: 'rocket-outline',
  },
  {
    id: 'flexible',
    label: 'Elastycznie',
    subtitle: 'Dynamiczne dopasowanie zadań do aktualnego kalendarza',
    hoursPerWeek: 5,
    icon: 'infinite-outline',
  },
];

export const TIME_COMMITMENT_LABELS: Record<TimeCommitment, string> = {
  '15-30m_daily': '15–30 min / dzień',
  '1h_daily': '1 godzina / dzień',
  '3-5h_weekly': '3–5 godz. / tydzień',
  '8-10h_weekly': '8–10 godz. / tydzień',
  flexible: 'Czas elastyczny',
};

export const SUGGESTED_ROLES_BY_DOMAIN: Record<CareerDomain, string[]> = {
  ai: ['AI Application Engineer', 'LLM Engineer', 'Prompt Engineer', 'AI Agent Architect'],
  software: ['Frontend Developer', 'Backend Developer', 'Fullstack Engineer', 'Mobile Developer'],
  data: ['Data Analyst', 'Data Engineer', 'Data Scientist', 'BI Developer'],
  product: ['Product Manager', 'AI Product Manager', 'Product Owner', 'Scrum Master'],
  design: ['UI/UX Designer', 'Product Designer', 'Design System Lead', 'UX Researcher'],
  other: ['Project Manager', 'Tech Lead', 'QA Specialist', 'Cybersecurity Specialist'],
};

export interface DatePresetOption {
  id: string;
  label: string;
  months: number;
}

export const DATE_PRESET_OPTIONS: DatePresetOption[] = [
  { id: '1m', label: 'Za 1 miesiąc', months: 1 },
  { id: '3m', label: 'Za 3 miesiące', months: 3 },
  { id: '6m', label: 'Za pół roku', months: 6 },
  { id: '1y', label: 'Za rok', months: 12 },
];

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

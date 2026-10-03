import type { DailyTask } from '@/types';
import { todayIsoDate } from '@/utils/date';

export const dailyTasks: DailyTask[] = [
  {
    id: 'task-read-eval',
    title: 'Przeczytaj 1 case ewaluacji LLM',
    description: 'Wybierz krótki artykuł o evals i wypisz 3 wnioski do swojego agenta.',
    category: 'learning',
    difficulty: 'easy',
    status: 'done',
    estimatedMinutes: 20,
    relatedSkill: 'Evaluation',
    dueDate: todayIsoDate(),
  },
  {
    id: 'task-agent-loop',
    title: 'Zaimplementuj pętlę tool-calling',
    description: 'Dodaj jeden tool i logi decyzji agenta w istniejącym projekcie.',
    category: 'practice',
    difficulty: 'medium',
    status: 'todo',
    estimatedMinutes: 45,
    relatedSkill: 'AI Agents',
    dueDate: todayIsoDate(),
  },
  {
    id: 'task-job-scan',
    title: 'Porównaj 2 oferty z Twoim celem',
    description: 'Zaznacz wymagania, które już spełniasz i te, które blokują aplikację.',
    category: 'application',
    difficulty: 'easy',
    status: 'todo',
    estimatedMinutes: 15,
    relatedSkill: 'Career Strategy',
    dueDate: todayIsoDate(),
  },
  {
    id: 'task-reflect',
    title: 'Zapisz jedną blokadę z tego tygodnia',
    description: 'Agent wykorzysta to jutro do skrócenia planu, zamiast dokładania kolejnych zadań.',
    category: 'reflection',
    difficulty: 'easy',
    status: 'todo',
    estimatedMinutes: 10,
    relatedSkill: 'Focus',
    dueDate: todayIsoDate(),
  },
];

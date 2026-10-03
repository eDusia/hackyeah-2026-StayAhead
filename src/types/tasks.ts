export type TaskCategory =
  | 'learning'
  | 'practice'
  | 'networking'
  | 'application'
  | 'reflection';

export type TaskStatus = 'todo' | 'in_progress' | 'done';

export type TaskDifficulty = 'easy' | 'medium' | 'hard';

export interface DailyTask {
  id: string;
  title: string;
  description: string;
  category: TaskCategory;
  difficulty: TaskDifficulty;
  status: TaskStatus;
  estimatedMinutes: number;
  relatedSkill?: string;
  dueDate: string;
}

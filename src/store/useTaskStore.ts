import { create } from 'zustand';

import { DEFAULT_STREAK } from '@/constants/theme';
import { dailyTasks } from '@/mock/dailyTasks';
import type { DailyTask, TaskCategory, TaskStatus } from '@/types';

interface TaskState {
  tasks: DailyTask[];
  streak: number;
  toggleTaskCompletion: (taskId: string) => void;
  filterTasksByCategory: (category: TaskCategory) => DailyTask[];
  refreshDailyTasks: () => void;
}

export const useTaskStore = create<TaskState>((set, get) => ({
  tasks: dailyTasks,
  streak: DEFAULT_STREAK,
  toggleTaskCompletion: (taskId) =>
    set((state) => {
      const tasks = state.tasks.map((task) => {
        if (task.id !== taskId) {
          return task;
        }

        const nextStatus: TaskStatus = task.status === 'done' ? 'todo' : 'done';
        return { ...task, status: nextStatus };
      });

      const completedCount = tasks.filter((task) => task.status === 'done').length;
      const streakBonus = completedCount === tasks.length ? 1 : 0;

      return {
        tasks,
        streak: DEFAULT_STREAK + streakBonus,
      };
    }),
  filterTasksByCategory: (category) => get().tasks.filter((task) => task.category === category),
  refreshDailyTasks: () =>
    set({
      tasks: dailyTasks.map((task) => ({ ...task })),
      streak: DEFAULT_STREAK,
    }),
}));

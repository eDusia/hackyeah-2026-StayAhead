import { Ionicons } from '@expo/vector-icons';
import { Pressable, Text, View } from 'react-native';

import { Badge } from '@/components/common/Badge';
import { TASK_CATEGORY_LABELS, TASK_DIFFICULTY_LABELS } from '@/constants/theme';
import type { DailyTask } from '@/types';

interface DailyTaskCardProps {
  task: DailyTask;
  onToggle: (taskId: string) => void;
}

const difficultyVariant = {
  easy: 'success',
  medium: 'info',
  hard: 'warning',
} as const;

export function DailyTaskCard({ task, onToggle }: DailyTaskCardProps) {
  const isDone = task.status === 'done';

  return (
    <Pressable
      onPress={() => onToggle(task.id)}
      className={`rounded-3xl border bg-white p-4 ${isDone ? 'border-success-100' : 'border-slate-100'}`}
    >
      <View className="flex-row items-start gap-3">
        <View
          className={`mt-0.5 h-6 w-6 items-center justify-center rounded-full border ${
            isDone ? 'border-success-600 bg-success-600' : 'border-slate-300 bg-white'
          }`}
        >
          {isDone ? <Ionicons name="checkmark" size={16} color="#ffffff" /> : null}
        </View>
        <View className="flex-1">
          <Text className={`text-base font-semibold ${isDone ? 'text-slate-400 line-through' : 'text-slate-900'}`}>
            {task.title}
          </Text>
          <Text className="mt-1 text-sm leading-5 text-slate-500">{task.description}</Text>
          <View className="mt-3 flex-row flex-wrap items-center gap-2">
            <Badge label={TASK_CATEGORY_LABELS[task.category]} />
            <Badge label={TASK_DIFFICULTY_LABELS[task.difficulty]} variant={difficultyVariant[task.difficulty]} />
            <View className="flex-row items-center gap-1">
              <Ionicons name="time-outline" size={14} color="#64748b" />
              <Text className="text-xs font-medium text-slate-500">{task.estimatedMinutes} min</Text>
            </View>
          </View>
        </View>
      </View>
    </Pressable>
  );
}

import { Ionicons } from '@expo/vector-icons';
import { Pressable, Text, View } from 'react-native';
import Animated, { useAnimatedStyle, useSharedValue, withSpring } from 'react-native-reanimated';

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

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

export function DailyTaskCard({ task, onToggle }: DailyTaskCardProps) {
  const isDone = task.status === 'done';
  const scale = useSharedValue(1);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  const handlePressIn = () => {
    scale.value = withSpring(0.97, { damping: 15, stiffness: 350 });
  };

  const handlePressOut = () => {
    scale.value = withSpring(1, { damping: 15, stiffness: 350 });
  };

  return (
    <AnimatedPressable
      onPress={() => onToggle(task.id)}
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      style={animatedStyle}
      className={`rounded-3xl border p-4.5 transition-colors ${
        isDone
          ? 'border-emerald-500/30 bg-emerald-950/20'
          : 'border-slate-800/80 bg-slate-900/80'
      }`}
    >
      <View className="flex-row items-start gap-3.5">
        <View
          className={`mt-0.5 h-6 w-6 items-center justify-center rounded-full border ${
            isDone
              ? 'border-emerald-400 bg-emerald-500'
              : 'border-slate-700 bg-slate-800/80'
          }`}
        >
          {isDone ? <Ionicons name="checkmark" size={15} color="#020617" /> : null}
        </View>
        <View className="flex-1">
          <Text
            className={`text-base font-semibold ${
              isDone ? 'text-slate-500 line-through' : 'text-slate-100'
            }`}
          >
            {task.title}
          </Text>
          <Text className="mt-1 text-sm leading-5 text-slate-400">{task.description}</Text>
          <View className="mt-3 flex-row flex-wrap items-center gap-2">
            <Badge label={TASK_CATEGORY_LABELS[task.category]} />
            <Badge label={TASK_DIFFICULTY_LABELS[task.difficulty]} variant={difficultyVariant[task.difficulty]} />
            <View className="flex-row items-center gap-1 rounded-full bg-slate-800/60 px-2 py-0.5">
              <Ionicons name="time-outline" size={13} color="#94a3b8" />
              <Text className="text-xs font-medium text-slate-400">{task.estimatedMinutes} min</Text>
            </View>
          </View>
        </View>
      </View>
    </AnimatedPressable>
  );
}

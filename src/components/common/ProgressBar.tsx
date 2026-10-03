import { useEffect } from 'react';
import { Text, View } from 'react-native';
import Animated, { useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';

import { clampPercent, formatPercent } from '@/utils/helpers';

type BarVariant = 'emerald' | 'indigo' | 'lime';

interface ProgressBarProps {
  value: number;
  label?: string;
  variant?: BarVariant;
  className?: string;
}

const barColor: Record<BarVariant, string> = {
  emerald: 'bg-emerald-400',
  indigo: 'bg-indigo-500',
  lime: 'bg-lime-400',
};

const textColor: Record<BarVariant, string> = {
  emerald: 'text-emerald-400',
  indigo: 'text-indigo-400',
  lime: 'text-lime-400',
};

export function ProgressBar({ value, label, variant = 'emerald', className = '' }: ProgressBarProps) {
  const progress = clampPercent(value);
  const width = useSharedValue(0);

  useEffect(() => {
    width.value = withTiming(progress, { duration: 500 });
  }, [progress, width]);

  const animatedStyle = useAnimatedStyle(() => ({
    width: `${width.value}%`,
  }));

  return (
    <View className={className}>
      <View className="mb-2.5 flex-row items-center justify-between">
        <Text className="text-sm font-medium text-slate-300">{label ?? 'Postęp'}</Text>
        <Text className={`text-sm font-bold ${textColor[variant]}`}>{formatPercent(progress)}</Text>
      </View>
      <View className="h-2.5 overflow-hidden rounded-full border border-slate-800 bg-slate-800/90">
        <Animated.View className={`h-full rounded-full ${barColor[variant]}`} style={animatedStyle} />
      </View>
    </View>
  );
}

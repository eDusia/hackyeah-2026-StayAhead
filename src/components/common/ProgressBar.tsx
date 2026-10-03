import { useEffect } from 'react';
import { Text, View } from 'react-native';
import Animated, { useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';

import { clampPercent, formatPercent } from '@/utils/helpers';

interface ProgressBarProps {
  value: number;
  label?: string;
}

export function ProgressBar({ value, label }: ProgressBarProps) {
  const progress = clampPercent(value);
  const width = useSharedValue(0);

  useEffect(() => {
    width.value = withTiming(progress, { duration: 420 });
  }, [progress, width]);

  const animatedStyle = useAnimatedStyle(() => ({
    width: `${width.value}%`,
  }));

  return (
    <View>
      <View className="mb-2 flex-row items-center justify-between">
        <Text className="text-sm font-medium text-slate-600">{label ?? 'Postęp'}</Text>
        <Text className="text-sm font-semibold text-slate-900">{formatPercent(progress)}</Text>
      </View>
      <View className="h-2 overflow-hidden rounded-full bg-slate-100">
        <Animated.View className="h-2 rounded-full bg-primary-600" style={animatedStyle} />
      </View>
    </View>
  );
}

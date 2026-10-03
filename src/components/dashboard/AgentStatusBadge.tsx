import { useEffect } from 'react';
import { Text, View } from 'react-native';
import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withTiming,
} from 'react-native-reanimated';

import type { AgentStatus } from '@/types';

interface AgentStatusBadgeProps {
  status: AgentStatus;
}

const statusCopy: Record<AgentStatus, string> = {
  idle: 'Mentor gotowy',
  thinking: 'Analizuje profil…',
  streaming: 'Pisze odpowiedź…',
};

export function AgentStatusBadge({ status }: AgentStatusBadgeProps) {
  const isBusy = status === 'thinking' || status === 'streaming';
  const pulseScale = useSharedValue(1);
  const pulseOpacity = useSharedValue(0.7);

  useEffect(() => {
    if (isBusy) {
      pulseScale.value = withRepeat(
        withTiming(2.2, { duration: 1200, easing: Easing.out(Easing.ease) }),
        -1,
        false
      );
      pulseOpacity.value = withRepeat(
        withTiming(0, { duration: 1200, easing: Easing.out(Easing.ease) }),
        -1,
        false
      );
    } else {
      pulseScale.value = 1;
      pulseOpacity.value = 0.7;
    }
  }, [isBusy, pulseScale, pulseOpacity]);

  const pulseStyle = useAnimatedStyle(() => ({
    transform: [{ scale: pulseScale.value }],
    opacity: pulseOpacity.value,
  }));

  return (
    <View
      className={`flex-row items-center gap-2 self-start rounded-full px-3 py-1.5 border ${
        isBusy
          ? 'border-indigo-500/50 bg-indigo-950/60 shadow-sm shadow-indigo-500/30'
          : 'border-slate-800 bg-slate-900/80'
      }`}
    >
      <View className="relative h-2 w-2 items-center justify-center">
        {isBusy ? (
          <Animated.View
            style={pulseStyle}
            className="absolute -inset-0.5 rounded-full bg-indigo-400"
          />
        ) : null}
        <View
          className={`h-2 w-2 rounded-full ${
            status === 'idle'
              ? 'bg-emerald-400'
              : status === 'thinking'
              ? 'bg-indigo-400'
              : 'bg-purple-400'
          }`}
        />
      </View>
      <Text
        className={`text-xs font-semibold ${
          isBusy ? 'text-indigo-300' : 'text-slate-300'
        }`}
      >
        {statusCopy[status]}
      </Text>
    </View>
  );
}

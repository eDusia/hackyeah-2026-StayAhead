import { useEffect, useRef } from 'react';
import { Animated, View } from 'react-native';

interface VoiceWaveVisualizerProps {
  isPlaying: boolean;
  color?: string;
  barCount?: number;
  height?: number;
}

export function VoiceWaveVisualizer({
  isPlaying,
  color = '#4f46e5',
  barCount = 6,
  height = 24,
}: VoiceWaveVisualizerProps) {
  // Animate individual bars with slight phase shifts
  const animations = useRef(
    Array.from({ length: barCount }, () => new Animated.Value(0.3))
  ).current;

  useEffect(() => {
    let animLoop: Animated.CompositeAnimation | null = null;

    if (isPlaying) {
      const parallelAnims = animations.map((anim, index) => {
        const minVal = 0.2 + (index % 3) * 0.1;
        const maxVal = 0.7 + ((index * 2) % 4) * 0.1;
        const duration = 320 + (index % 4) * 90;

        return Animated.loop(
          Animated.sequence([
            Animated.timing(anim, {
              toValue: maxVal,
              duration,
              useNativeDriver: false,
            }),
            Animated.timing(anim, {
              toValue: minVal,
              duration,
              useNativeDriver: false,
            }),
          ])
        );
      });

      animLoop = Animated.parallel(parallelAnims);
      animLoop.start();
    } else {
      animations.forEach((anim) => {
        Animated.timing(anim, {
          toValue: 0.25,
          duration: 200,
          useNativeDriver: false,
        }).start();
      });
    }

    return () => {
      animLoop?.stop();
    };
  }, [isPlaying, animations]);

  return (
    <View
      style={{ height }}
      className="flex-row items-center justify-center gap-1 px-1"
    >
      {animations.map((anim, idx) => (
        <Animated.View
          key={idx}
          style={{
            width: 3.5,
            height: anim.interpolate({
              inputRange: [0, 1],
              outputRange: [4, height],
            }),
            backgroundColor: color,
            borderRadius: 2,
          }}
        />
      ))}
    </View>
  );
}

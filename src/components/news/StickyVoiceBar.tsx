import { Ionicons } from '@expo/vector-icons';
import { Pressable, Text, View } from 'react-native';

import { VoiceWaveVisualizer } from '@/components/news/VoiceWaveVisualizer';

interface StickyVoiceBarProps {
  title: string;
  topicLabel: string;
  isPlaying: boolean;
  onPressBar: () => void;
  onTogglePlay: () => void;
  onClose: () => void;
}

export function StickyVoiceBar({
  title,
  topicLabel,
  isPlaying,
  onPressBar,
  onTogglePlay,
  onClose,
}: StickyVoiceBarProps) {
  return (
    <View className="absolute bottom-4 left-4 right-4 z-50">
      <Pressable
        onPress={onPressBar}
        className="flex-row items-center justify-between rounded-2xl border border-slate-700 bg-slate-900/95 px-4 py-3 shadow-xl backdrop-blur-md"
      >
        <View className="flex-1 flex-row items-center gap-3 pr-2">
          <View className="h-9 w-9 items-center justify-center rounded-xl bg-primary-600/30 border border-primary-500/40">
            <VoiceWaveVisualizer isPlaying={isPlaying} color="#818cf8" barCount={4} height={16} />
          </View>

          <View className="flex-1">
            <Text className="text-[10px] font-bold uppercase tracking-wider text-primary-400">
              {topicLabel}
            </Text>
            <Text className="text-xs font-bold text-white" numberOfLines={1}>
              {title}
            </Text>
          </View>
        </View>

        <View className="flex-row items-center gap-2">
          <Pressable
            onPress={(e) => {
              e.stopPropagation?.();
              onTogglePlay();
            }}
            className="h-8 w-8 items-center justify-center rounded-full bg-primary-600 active:bg-primary-500"
          >
            <Ionicons
              name={isPlaying ? 'pause' : 'play'}
              size={15}
              color="#ffffff"
              style={{ marginLeft: isPlaying ? 0 : 1 }}
            />
          </Pressable>

          <Pressable
            onPress={(e) => {
              e.stopPropagation?.();
              onClose();
            }}
            className="h-8 w-8 items-center justify-center rounded-full bg-slate-800 active:bg-slate-700"
          >
            <Ionicons name="close" size={15} color="#94a3b8" />
          </Pressable>
        </View>
      </Pressable>
    </View>
  );
}

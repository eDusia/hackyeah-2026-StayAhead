import { Ionicons } from '@expo/vector-icons';
import { Pressable, Text, View } from 'react-native';

import { Card } from '@/components/common/Card';
import { VoiceWaveVisualizer } from '@/components/news/VoiceWaveVisualizer';

interface VoiceBriefCardProps {
  isPlaying: boolean;
  onPressPlay: () => void;
  topicCount?: number;
  durationText?: string;
}

export function VoiceBriefCard({
  isPlaying,
  onPressPlay,
  topicCount = 4,
  durationText = '~2 min',
}: VoiceBriefCardProps) {
  return (
    <Card className="border-primary-200 bg-gradient-to-br from-primary-900 to-slate-900 p-4 shadow-md">
      <View className="flex-row items-center justify-between">
        <View className="flex-row items-center gap-1.5 rounded-full bg-primary-800/80 px-2.5 py-1 border border-primary-700/50">
          <Ionicons name="sparkles" size={12} color="#c7d2fe" />
          <Text className="text-[11px] font-bold uppercase tracking-wider text-primary-200">
            Audio Briefing AI
          </Text>
        </View>

        {isPlaying ? (
          <View className="flex-row items-center gap-1.5 rounded-full bg-emerald-950/80 px-2.5 py-0.5 border border-emerald-500/40">
            <View className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
            <Text className="text-[10px] font-bold text-emerald-300">ODTWARZANIE</Text>
          </View>
        ) : (
          <View className="flex-row items-center gap-1">
            <Ionicons name="time-outline" size={13} color="#94a3b8" />
            <Text className="text-xs text-slate-300 font-medium">{durationText}</Text>
          </View>
        )}
      </View>

      <Text className="mt-2.5 text-lg font-bold text-white">
        Odsłuchaj podsumowanie newsów
      </Text>
      <Text className="mt-1 text-xs leading-5 text-slate-300">
        AI lektor podsumowuje najważniejsze ruchy na rynku w 2 minuty — idealne w drodze do pracy lub podczas przerwy na kawę.
      </Text>

      {/* Feature tags */}
      <View className="mt-3 flex-row flex-wrap items-center gap-2">
        <View className="rounded-lg bg-slate-800/80 px-2 py-1 border border-slate-700/60">
          <Text className="text-[11px] font-medium text-slate-300">🎧 {topicCount} kluczowe tematy</Text>
        </View>
        <View className="rounded-lg bg-slate-800/80 px-2 py-1 border border-slate-700/60">
          <Text className="text-[11px] font-medium text-slate-300">🇵🇱 Lektor po polsku</Text>
        </View>
        <View className="rounded-lg bg-slate-800/80 px-2 py-1 border border-slate-700/60">
          <Text className="text-[11px] font-medium text-slate-300">💡 Wnioski do CV</Text>
        </View>
      </View>

      {/* Action button */}
      <Pressable
        onPress={onPressPlay}
        className={`mt-4 min-h-[46px] flex-row items-center justify-center rounded-2xl px-4 active:opacity-90 ${
          isPlaying ? 'bg-emerald-600' : 'bg-primary-600'
        }`}
      >
        {isPlaying ? (
          <View className="flex-row items-center gap-2">
            <VoiceWaveVisualizer isPlaying={true} color="#ffffff" barCount={5} height={18} />
            <Text className="text-sm font-bold text-white">Otwórz odtwarzacz głosowy</Text>
          </View>
        ) : (
          <View className="flex-row items-center gap-2">
            <Ionicons name="play" size={16} color="#ffffff" />
            <Text className="text-sm font-bold text-white">Odsłuchaj skrót ({durationText})</Text>
          </View>
        )}
      </Pressable>
    </Card>
  );
}

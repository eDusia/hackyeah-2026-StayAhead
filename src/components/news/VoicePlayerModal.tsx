import { Ionicons } from '@expo/vector-icons';
import { Modal, Pressable, ScrollView, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { Badge } from '@/components/common/Badge';
import { VoiceWaveVisualizer } from '@/components/news/VoiceWaveVisualizer';
import type { VoiceBriefSnippet } from '@/types';

interface VoicePlayerModalProps {
  visible: boolean;
  onClose: () => void;
  onMinimize: () => void;
  snippets: VoiceBriefSnippet[];
  currentIndex: number;
  isPlaying: boolean;
  playbackRate: number;
  onTogglePlay: () => void;
  onPrev: () => void;
  onNext: () => void;
  onSelectSnippetIndex: (index: number) => void;
  onChangeRate: (rate: number) => void;
  onOpenArticle?: (articleId: string) => void;
}

export function VoicePlayerModal({
  visible,
  onClose,
  onMinimize,
  snippets,
  currentIndex,
  isPlaying,
  playbackRate,
  onTogglePlay,
  onPrev,
  onNext,
  onSelectSnippetIndex,
  onChangeRate,
  onOpenArticle,
}: VoicePlayerModalProps) {
  const currentSnippet = snippets[currentIndex] || snippets[0];
  const isFirst = currentIndex === 0;
  const isLast = currentIndex === snippets.length - 1;

  if (!currentSnippet) return null;

  return (
    <Modal
      visible={visible}
      animationType="slide"
      presentationStyle="pageSheet"
      onRequestClose={onMinimize}
    >
      <SafeAreaView className="flex-1 bg-slate-900">
        {/* Header */}
        <View className="flex-row items-center justify-between border-b border-slate-800 px-5 py-3">
          <Pressable
            onPress={onMinimize}
            className="flex-row items-center gap-1 rounded-full bg-slate-800 px-3 py-1.5 active:bg-slate-700"
          >
            <Ionicons name="chevron-down" size={16} color="#94a3b8" />
            <Text className="text-xs font-semibold text-slate-300">Zminimalizuj</Text>
          </Pressable>

          <View className="items-center">
            <Text className="text-xs font-bold uppercase tracking-widest text-primary-400">
              StayAhead Audio Brief
            </Text>
            <Text className="text-[11px] text-slate-400">
              Temat {currentIndex + 1} z {snippets.length}
            </Text>
          </View>

          <Pressable
            onPress={onClose}
            className="h-8 w-8 items-center justify-center rounded-full bg-slate-800 active:bg-slate-700"
          >
            <Ionicons name="close" size={18} color="#94a3b8" />
          </Pressable>
        </View>

        <ScrollView
          contentContainerClassName="px-6 py-6 pb-12 items-center"
          showsVerticalScrollIndicator={false}
        >
          {/* Visualizer Hero Card */}
          <View className="w-full items-center rounded-3xl border border-slate-800 bg-slate-800/60 p-6">
            <View className="h-16 w-16 items-center justify-center rounded-full bg-primary-600/20 border border-primary-500/30">
              <Ionicons name="mic" size={28} color="#818cf8" />
            </View>

            {/* Voice Wave Animation */}
            <View className="mt-4">
              <VoiceWaveVisualizer
                isPlaying={isPlaying}
                color="#818cf8"
                barCount={9}
                height={32}
              />
            </View>

            <View className="mt-4 flex-row items-center gap-2">
              <View className="h-2 w-2 rounded-full bg-emerald-400" />
              <Text className="text-xs font-medium text-slate-300">
                {isPlaying ? 'Lektor AI czyta na żywo' : 'Odtwarzanie wstrzymane'}
              </Text>
            </View>

            <View className="mt-3">
              <Badge label={currentSnippet.topicLabel} variant="info" />
            </View>

            <Text className="mt-3 text-center text-xl font-bold leading-7 text-white">
              {currentSnippet.title}
            </Text>
          </View>

          {/* Spoken Text Transcript */}
          <View className="mt-6 w-full rounded-2xl border border-slate-800 bg-slate-800/40 p-4">
            <View className="flex-row items-center justify-between">
              <Text className="text-xs font-bold uppercase tracking-wider text-slate-400">
                Transkrypcja głosu lektora
              </Text>
              <Text className="text-[11px] text-primary-400 font-medium">Język: Polski (pl-PL)</Text>
            </View>

            <Text className="mt-2.5 text-base leading-7 text-slate-200">
              {currentSnippet.speechText}
            </Text>

            {/* Key takeaway highlight inside transcript */}
            <View className="mt-4 rounded-xl border border-primary-900/60 bg-primary-950/50 p-3">
              <View className="flex-row items-center gap-1.5">
                <Ionicons name="bulb" size={15} color="#fbbf24" />
                <Text className="text-xs font-bold text-amber-300">Wniosek dla Ciebie:</Text>
              </View>
              <Text className="mt-1 text-xs leading-5 text-slate-300">
                {currentSnippet.keyTakeaway}
              </Text>
            </View>
          </View>

          {/* Snippet Step Indicators */}
          <View className="mt-6 flex-row items-center gap-2">
            {snippets.map((snip, idx) => (
              <Pressable
                key={snip.id}
                onPress={() => onSelectSnippetIndex(idx)}
                className={`h-2.5 rounded-full transition-all ${
                  idx === currentIndex ? 'w-8 bg-primary-500' : 'w-2.5 bg-slate-700'
                }`}
              />
            ))}
          </View>

          {/* Player Controls */}
          <View className="mt-6 w-full flex-row items-center justify-center gap-6">
            {/* Prev */}
            <Pressable
              disabled={isFirst}
              onPress={onPrev}
              className={`h-12 w-12 items-center justify-center rounded-full bg-slate-800 ${
                isFirst ? 'opacity-30' : 'active:bg-slate-700'
              }`}
            >
              <Ionicons name="play-skip-back" size={20} color="#ffffff" />
            </Pressable>

            {/* Play/Pause main button */}
            <Pressable
              onPress={onTogglePlay}
              className="h-16 w-16 items-center justify-center rounded-full bg-primary-600 shadow-lg shadow-primary-500/30 active:bg-primary-500"
            >
              <Ionicons
                name={isPlaying ? 'pause' : 'play'}
                size={28}
                color="#ffffff"
                style={{ marginLeft: isPlaying ? 0 : 2 }}
              />
            </Pressable>

            {/* Next */}
            <Pressable
              disabled={isLast}
              onPress={onNext}
              className={`h-12 w-12 items-center justify-center rounded-full bg-slate-800 ${
                isLast ? 'opacity-30' : 'active:bg-slate-700'
              }`}
            >
              <Ionicons name="play-skip-forward" size={20} color="#ffffff" />
            </Pressable>
          </View>

          {/* Speed Selection */}
          <View className="mt-6 flex-row items-center gap-2 rounded-2xl bg-slate-800/80 p-1.5 border border-slate-700">
            <Text className="px-2 text-xs font-medium text-slate-400">Tempo:</Text>
            {[1.0, 1.25, 1.5].map((rate) => {
              const isSelected = playbackRate === rate;
              return (
                <Pressable
                  key={rate}
                  onPress={() => onChangeRate(rate)}
                  className={`rounded-xl px-3 py-1 ${
                    isSelected ? 'bg-primary-600' : 'bg-transparent'
                  }`}
                >
                  <Text
                    className={`text-xs font-bold ${
                      isSelected ? 'text-white' : 'text-slate-400'
                    }`}
                  >
                    {rate}x
                  </Text>
                </Pressable>
              );
            })}
          </View>

          {/* Optional: Read full article link */}
          {currentSnippet.articleId && onOpenArticle ? (
            <Pressable
              onPress={() => {
                onMinimize();
                onOpenArticle(currentSnippet.articleId!);
              }}
              className="mt-6 flex-row items-center gap-1.5 rounded-full border border-slate-700 bg-slate-800/50 px-4 py-2"
            >
              <Text className="text-xs font-semibold text-primary-400">
                Otwórz pełny artykuł w tekście
              </Text>
              <Ionicons name="arrow-forward" size={13} color="#818cf8" />
            </Pressable>
          ) : null}
        </ScrollView>
      </SafeAreaView>
    </Modal>
  );
}

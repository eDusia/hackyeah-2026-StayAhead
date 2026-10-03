import { Ionicons } from '@expo/vector-icons';
import { useEffect, useState } from 'react';
import { Modal, Pressable, ScrollView, Text, TextInput, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { Badge } from '@/components/common/Badge';
import { Card } from '@/components/common/Card';
import {
  StickyVoiceBar,
  VoiceBriefCard,
  VoicePlayerModal,
} from '@/components/news';
import { dailyVoiceBriefing, newsArticles } from '@/mock/newsData';
import type { NewsArticle, NewsCategory, VoiceBriefSnippet } from '@/types';
import { speechService } from '@/utils';

const CATEGORIES: { id: NewsCategory; label: string }[] = [
  { id: 'all', label: 'Wszystkie' },
  { id: 'ai_trends', label: 'Trendy AI' },
  { id: 'market', label: 'Rynek & Płace' },
  { id: 'tools', label: 'Narzędzia' },
  { id: 'best_practices', label: 'Dobre praktyki' },
];

export function NewsScreen() {
  const [selectedCategory, setSelectedCategory] = useState<NewsCategory>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [bookmarkedIds, setBookmarkedIds] = useState<string[]>([]);
  const [activeArticle, setActiveArticle] = useState<NewsArticle | null>(null);

  // Voice Functionality State
  const [isVoiceActive, setIsVoiceActive] = useState(false);
  const [isVoicePlaying, setIsVoicePlaying] = useState(false);
  const [voiceSnippetIndex, setVoiceSnippetIndex] = useState(0);
  const [isVoiceModalOpen, setIsVoiceModalOpen] = useState(false);
  const [playbackRate, setPlaybackRate] = useState(1.0);
  const [currentSnippetList, setCurrentSnippetList] = useState<VoiceBriefSnippet[]>(
    dailyVoiceBriefing.snippets
  );

  // Stop speech synthesis on component unmount
  useEffect(() => {
    return () => {
      speechService.stop();
    };
  }, []);

  const toggleBookmark = (id: string) => {
    setBookmarkedIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const filteredArticles = newsArticles.filter((article) => {
    const matchesCategory =
      selectedCategory === 'all' || article.category === selectedCategory;
    const matchesSearch =
      article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      article.summary.toLowerCase().includes(searchQuery.toLowerCase()) ||
      article.tags.some((tag) => tag.toLowerCase().includes(searchQuery.toLowerCase()));

    return matchesCategory && matchesSearch;
  });

  const featured = newsArticles.find((a) => a.isFeatured) ?? newsArticles[0];

  // Voice Briefing Handlers
  const playSnippetAtIndex = (index: number, snippets = currentSnippetList, rate = playbackRate) => {
    const snippet = snippets[index];
    if (!snippet) return;

    setVoiceSnippetIndex(index);
    setIsVoiceActive(true);
    setIsVoicePlaying(true);

    speechService.speak(snippet.speechText, {
      rate,
      onStart: () => {
        setIsVoicePlaying(true);
      },
      onEnd: () => {
        // Auto-advance to next snippet if exists
        if (index < snippets.length - 1) {
          playSnippetAtIndex(index + 1, snippets, rate);
        } else {
          setIsVoicePlaying(false);
        }
      },
      onError: () => {
        setIsVoicePlaying(false);
      },
    });
  };

  const handleStartBriefing = (startIdx = 0) => {
    setCurrentSnippetList(dailyVoiceBriefing.snippets);
    setIsVoiceModalOpen(true);
    playSnippetAtIndex(startIdx, dailyVoiceBriefing.snippets, playbackRate);
  };

  const handlePlaySingleArticle = (article: NewsArticle) => {
    const singleSnippet: VoiceBriefSnippet = {
      id: `article-voice-${article.id}`,
      articleId: article.id,
      topicLabel: 'Podsumowanie artykułu',
      title: article.title,
      speechText: `Oto podsumowanie artykułu: ${article.title}. ${article.summary}. Kluczowy wniosek dla Twojej kariery: ${article.keyTakeaway}`,
      keyTakeaway: article.keyTakeaway,
      estimatedSec: 25,
    };

    setCurrentSnippetList([singleSnippet]);
    setVoiceSnippetIndex(0);
    setIsVoiceModalOpen(true);
    playSnippetAtIndex(0, [singleSnippet], playbackRate);
  };

  const handleTogglePlay = () => {
    if (isVoicePlaying) {
      speechService.pause();
      setIsVoicePlaying(false);
    } else {
      if (isVoiceActive) {
        speechService.resume();
        setIsVoicePlaying(true);
      } else {
        handleStartBriefing(voiceSnippetIndex);
      }
    }
  };

  const handlePrevSnippet = () => {
    if (voiceSnippetIndex > 0) {
      playSnippetAtIndex(voiceSnippetIndex - 1, currentSnippetList, playbackRate);
    }
  };

  const handleNextSnippet = () => {
    if (voiceSnippetIndex < currentSnippetList.length - 1) {
      playSnippetAtIndex(voiceSnippetIndex + 1, currentSnippetList, playbackRate);
    }
  };

  const handleChangeRate = (newRate: number) => {
    setPlaybackRate(newRate);
    if (isVoicePlaying) {
      playSnippetAtIndex(voiceSnippetIndex, currentSnippetList, newRate);
    }
  };

  const handleStopVoice = () => {
    speechService.stop();
    setIsVoiceActive(false);
    setIsVoicePlaying(false);
    setIsVoiceModalOpen(false);
  };

  const currentPlayingSnippet = currentSnippetList[voiceSnippetIndex] || currentSnippetList[0];

  return (
    <SafeAreaView className="flex-1 bg-slate-50">
      <ScrollView contentContainerClassName="px-5 pb-24" showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View className="mt-2">
          <Text className="text-sm font-semibold uppercase tracking-wider text-primary-600">
            Wiedza & Trendy
          </Text>
          <Text className="mt-1 text-3xl font-bold text-slate-900">Nowości</Text>
          <Text className="mt-1 text-base text-slate-500">
            Najważniejsze artykuły, zmiany w wymaganiach rekruterów i trendy technologiczne.
          </Text>
        </View>

        {/* 1. OPCJONALNA SEKCJA GŁOSOWA: AUDIO BRIEFING CARD */}
        <View className="mt-4">
          <VoiceBriefCard
            isPlaying={isVoicePlaying}
            onPressPlay={() => {
              if (isVoiceActive && !isVoiceModalOpen) {
                setIsVoiceModalOpen(true);
              } else {
                handleStartBriefing(0);
              }
            }}
            topicCount={dailyVoiceBriefing.snippets.length}
            durationText={dailyVoiceBriefing.totalDurationText}
          />
        </View>

        {/* Search Bar */}
        <View className="mt-4 flex-row items-center rounded-2xl border border-slate-200 bg-white px-3 py-2.5">
          <Ionicons name="search-outline" size={18} color="#94a3b8" />
          <TextInput
            placeholder="Szukaj artykułu, technologii, frazy..."
            placeholderTextColor="#94a3b8"
            value={searchQuery}
            onChangeText={setSearchQuery}
            className="ml-2 flex-1 text-base text-slate-800"
          />
          {searchQuery.length > 0 ? (
            <Pressable onPress={() => setSearchQuery('')}>
              <Ionicons name="close-circle" size={18} color="#94a3b8" />
            </Pressable>
          ) : null}
        </View>

        {/* Category Pills */}
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerClassName="gap-2 py-4"
        >
          {CATEGORIES.map((cat) => {
            const isSelected = selectedCategory === cat.id;
            return (
              <Pressable
                key={cat.id}
                onPress={() => setSelectedCategory(cat.id)}
                className={`rounded-full px-4 py-2 ${
                  isSelected ? 'bg-primary-600' : 'border border-slate-200 bg-white'
                }`}
              >
                <Text
                  className={`text-sm font-semibold ${
                    isSelected ? 'text-white' : 'text-slate-600'
                  }`}
                >
                  {cat.label}
                </Text>
              </Pressable>
            );
          })}
        </ScrollView>

        {/* Featured Article Hero (only if viewing all or matching search) */}
        {selectedCategory === 'all' && searchQuery.trim() === '' && featured ? (
          <View className="mb-6">
            <Text className="mb-2.5 text-xs font-bold uppercase tracking-wider text-slate-400">
              Wyróżniony artykuł dnia
            </Text>
            <Pressable onPress={() => setActiveArticle(featured)}>
              <Card className="border-primary-100 bg-gradient-to-br from-white to-primary-50/40 p-5 shadow-md">
                <View className="flex-row items-center justify-between">
                  <View className="flex-row items-center gap-2">
                    <Badge label="Must-read" variant="info" />
                    <Text className="text-xs font-medium text-slate-400">
                      {featured.readTime}
                    </Text>
                  </View>
                  <View className="flex-row items-center gap-3">
                    {/* Voice button for single article */}
                    <Pressable
                      onPress={(e) => {
                        e.stopPropagation?.();
                        handlePlaySingleArticle(featured);
                      }}
                      hitSlop={10}
                      className="flex-row items-center gap-1 rounded-full bg-primary-50 px-2 py-1 border border-primary-200"
                    >
                      <Ionicons name="volume-medium" size={14} color="#4f46e5" />
                      <Text className="text-[11px] font-bold text-primary-700">Odsłuchaj</Text>
                    </Pressable>

                    <Pressable
                      onPress={(e) => {
                        e.stopPropagation?.();
                        toggleBookmark(featured.id);
                      }}
                      hitSlop={10}
                    >
                      <Ionicons
                        name={bookmarkedIds.includes(featured.id) ? 'bookmark' : 'bookmark-outline'}
                        size={20}
                        color={bookmarkedIds.includes(featured.id) ? '#4f46e5' : '#94a3b8'}
                      />
                    </Pressable>
                  </View>
                </View>

                <Text className="mt-3 text-lg font-bold leading-6 text-slate-900">
                  {featured.title}
                </Text>
                <Text className="mt-2 text-sm leading-5 text-slate-600" numberOfLines={3}>
                  {featured.summary}
                </Text>

                <View className="mt-4 rounded-xl bg-primary-50/70 p-3">
                  <Text className="text-xs font-bold text-primary-800">Kluczowy wniosek:</Text>
                  <Text className="mt-0.5 text-xs text-primary-700">
                    {featured.keyTakeaway}
                  </Text>
                </View>

                <View className="mt-4 flex-row items-center justify-between pt-2">
                  <Text className="text-xs text-slate-400">
                    Źródło: {featured.source} · {featured.publishedAt}
                  </Text>
                  <View className="flex-row items-center gap-1">
                    <Text className="text-xs font-bold text-primary-600">Czytaj całość</Text>
                    <Ionicons name="arrow-forward" size={13} color="#4f46e5" />
                  </View>
                </View>
              </Card>
            </Pressable>
          </View>
        ) : null}

        {/* Articles List */}
        <View className="flex-row items-center justify-between">
          <Text className="text-lg font-bold text-slate-900">Najnowsze publikacje</Text>
          <Text className="text-xs font-medium text-slate-400">
            {filteredArticles.length} {filteredArticles.length === 1 ? 'wpis' : 'wpisów'}
          </Text>
        </View>

        {filteredArticles.length === 0 ? (
          <Card className="mt-4 items-center py-8">
            <Ionicons name="newspaper-outline" size={40} color="#cbd5e1" />
            <Text className="mt-2 text-base font-semibold text-slate-700">Brak artykułów</Text>
            <Text className="mt-1 text-xs text-slate-400">
              Spróbuj zmienić kategorię lub wyczyścić pole wyszukiwania.
            </Text>
          </Card>
        ) : (
          <View className="mt-3 gap-3">
            {filteredArticles.map((article) => {
              const isBookmarked = bookmarkedIds.includes(article.id);
              return (
                <Pressable
                  key={article.id}
                  onPress={() => setActiveArticle(article)}
                  className="active:opacity-90"
                >
                  <Card className="p-4">
                    <View className="flex-row items-start justify-between">
                      <View className="flex-1 pr-2">
                        <View className="flex-row items-center gap-2">
                          <Text className="text-xs font-medium text-primary-600">
                            {article.source}
                          </Text>
                          <Text className="text-xs text-slate-300">•</Text>
                          <Text className="text-xs text-slate-400">{article.readTime}</Text>
                        </View>
                        <Text className="mt-1.5 text-base font-bold leading-5 text-slate-900">
                          {article.title}
                        </Text>
                      </View>

                      <View className="flex-row items-center gap-2">
                        {/* Audio button */}
                        <Pressable
                          onPress={(e) => {
                            e.stopPropagation?.();
                            handlePlaySingleArticle(article);
                          }}
                          hitSlop={8}
                          className="h-8 w-8 items-center justify-center rounded-full bg-slate-100 active:bg-primary-50"
                        >
                          <Ionicons name="volume-medium" size={16} color="#4f46e5" />
                        </Pressable>

                        {/* Bookmark */}
                        <Pressable
                          onPress={(e) => {
                            e.stopPropagation?.();
                            toggleBookmark(article.id);
                          }}
                          hitSlop={8}
                        >
                          <Ionicons
                            name={isBookmarked ? 'bookmark' : 'bookmark-outline'}
                            size={18}
                            color={isBookmarked ? '#4f46e5' : '#94a3b8'}
                          />
                        </Pressable>
                      </View>
                    </View>

                    <Text className="mt-2 text-xs leading-5 text-slate-500" numberOfLines={2}>
                      {article.summary}
                    </Text>

                    <View className="mt-3 flex-row flex-wrap items-center justify-between gap-2 border-t border-slate-100 pt-2.5">
                      <View className="flex-row flex-wrap gap-1.5">
                        {article.tags.map((t) => (
                          <View key={t} className="rounded-md bg-slate-100 px-2 py-0.5">
                            <Text className="text-[11px] font-medium text-slate-600">#{t}</Text>
                          </View>
                        ))}
                      </View>
                      <Text className="text-[11px] text-slate-400">{article.publishedAt}</Text>
                    </View>
                  </Card>
                </Pressable>
              );
            })}
          </View>
        )}
      </ScrollView>

      {/* 2. STICKY BOTTOM MINI-PLAYER (when voice is active & modal minimized) */}
      {isVoiceActive && !isVoiceModalOpen && currentPlayingSnippet ? (
        <StickyVoiceBar
          title={currentPlayingSnippet.title}
          topicLabel={currentPlayingSnippet.topicLabel}
          isPlaying={isVoicePlaying}
          onPressBar={() => setIsVoiceModalOpen(true)}
          onTogglePlay={handleTogglePlay}
          onClose={handleStopVoice}
        />
      ) : null}

      {/* 3. VOICE PLAYER FULL MODAL */}
      <VoicePlayerModal
        visible={isVoiceModalOpen}
        onClose={handleStopVoice}
        onMinimize={() => setIsVoiceModalOpen(false)}
        snippets={currentSnippetList}
        currentIndex={voiceSnippetIndex}
        isPlaying={isVoicePlaying}
        playbackRate={playbackRate}
        onTogglePlay={handleTogglePlay}
        onPrev={handlePrevSnippet}
        onNext={handleNextSnippet}
        onSelectSnippetIndex={(idx) =>
          playSnippetAtIndex(idx, currentSnippetList, playbackRate)
        }
        onChangeRate={handleChangeRate}
        onOpenArticle={(artId) => {
          const match = newsArticles.find((a) => a.id === artId);
          if (match) {
            setActiveArticle(match);
          }
        }}
      />

      {/* 4. ARTICLE DETAIL MODAL */}
      <Modal
        visible={activeArticle !== null}
        animationType="slide"
        presentationStyle="pageSheet"
        onRequestClose={() => setActiveArticle(null)}
      >
        <SafeAreaView className="flex-1 bg-white">
          <View className="flex-row items-center justify-between border-b border-slate-100 px-5 py-3">
            <View className="flex-row items-center gap-2">
              <Badge label={activeArticle?.source ?? 'Artykuł'} variant="info" />
              <Text className="text-xs text-slate-400">{activeArticle?.readTime}</Text>
            </View>
            <Pressable
              onPress={() => setActiveArticle(null)}
              className="h-8 w-8 items-center justify-center rounded-full bg-slate-100"
            >
              <Ionicons name="close" size={20} color="#64748b" />
            </Pressable>
          </View>

          {activeArticle ? (
            <ScrollView contentContainerClassName="px-5 py-6 pb-12" showsVerticalScrollIndicator={false}>
              <Text className="text-2xl font-bold leading-8 text-slate-900">
                {activeArticle.title}
              </Text>
              <Text className="mt-2 text-xs text-slate-400">
                Opublikowano: {activeArticle.publishedAt} · Źródło: {activeArticle.source}
              </Text>

              {/* Dedicated Voice Audio Button inside the Article Modal */}
              <Pressable
                onPress={() => handlePlaySingleArticle(activeArticle)}
                className="mt-4 flex-row items-center justify-center gap-2 rounded-2xl bg-primary-50 border border-primary-200 py-3 px-4 active:bg-primary-100"
              >
                <Ionicons name="volume-high" size={18} color="#4f46e5" />
                <Text className="text-sm font-bold text-primary-700">
                  Odsłuchaj podsumowanie głosowe tego artykułu
                </Text>
              </Pressable>

              <View className="mt-5 rounded-2xl border border-primary-100 bg-primary-50/50 p-4">
                <View className="flex-row items-center gap-1.5">
                  <Ionicons name="bulb-outline" size={18} color="#4f46e5" />
                  <Text className="text-sm font-bold text-primary-900">
                    Kluczowy wniosek dla Twojej kariery:
                  </Text>
                </View>
                <Text className="mt-1.5 text-sm leading-5 text-primary-800">
                  {activeArticle.keyTakeaway}
                </Text>
              </View>

              <View className="mt-6">
                <Text className="text-base font-semibold text-slate-900">Wprowadzenie</Text>
                <Text className="mt-2 text-base leading-7 text-slate-700">
                  {activeArticle.summary}
                </Text>
              </View>

              <View className="mt-6">
                <Text className="text-base font-semibold text-slate-900">Analiza i szczegóły</Text>
                <Text className="mt-2 text-base leading-7 text-slate-700">
                  {activeArticle.content}
                </Text>
              </View>

              <View className="mt-8 border-t border-slate-100 pt-4">
                <Text className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                  Tagi tematyczne
                </Text>
                <View className="mt-2 flex-row flex-wrap gap-2">
                  {activeArticle.tags.map((tag) => (
                    <Badge key={tag} label={`#${tag}`} variant="default" />
                  ))}
                </View>
              </View>
            </ScrollView>
          ) : null}
        </SafeAreaView>
      </Modal>
    </SafeAreaView>
  );
}

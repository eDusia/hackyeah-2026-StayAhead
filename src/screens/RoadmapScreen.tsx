import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import type { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import { ScrollView, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { Badge } from '@/components/common/Badge';
import { Button } from '@/components/common/Button';
import { Card } from '@/components/common/Card';
import { ProgressBar } from '@/components/common/ProgressBar';
import { MilestoneCard } from '@/components/roadmap/MilestoneCard';
import { TimelineNode } from '@/components/roadmap/TimelineNode';
import { generatedMilestones, generatedRoadmap } from '@/mock/generatedRoadmap';
import { curatedDailyOffers } from '@/mock/jobsData';
import { useUserStore } from '@/store/useUserStore';
import type { MainTabParamList } from '@/types';
import { calculateCompletionRate, calculateMarketMatch } from '@/utils/helpers';

export function RoadmapScreen() {
  const navigation = useNavigation<BottomTabNavigationProp<MainTabParamList>>();
  const profile = useUserStore((state) => state.profile);
  const completedSteps = generatedRoadmap.filter((item) => item.status === 'completed').length;
  const roadmapProgress = calculateCompletionRate(completedSteps, generatedRoadmap.length);
  const topJob = curatedDailyOffers[0];
  const match = calculateMarketMatch(profile.skills, topJob.matchingSkills);

  const completedMilestones = generatedMilestones.filter((m) => m.status === 'completed').length;

  return (
    <SafeAreaView className="flex-1 bg-slate-50">
      <ScrollView contentContainerClassName="px-5 pb-10" showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View className="mt-2">
          <Text className="text-sm font-semibold uppercase tracking-wider text-primary-600">
            Ścieżka Rozwoju
          </Text>
          <Text className="mt-1 text-3xl font-bold text-slate-900">Twoja ścieżka</Text>
          <Text className="mt-1 text-base text-slate-500">
            Dedykowany plan etapowy z kamieniami milowymi do roli{' '}
            <Text className="font-semibold text-slate-800">
              {profile.goal?.targetRole ?? 'AI Application Engineer'}
            </Text>
            .
          </Text>
        </View>

        {/* Global Progress Card */}
        <Card className="mt-4 p-4 shadow-sm">
          <View className="flex-row items-center justify-between">
            <Text className="text-sm font-bold text-slate-900">Całkowity postęp ścieżki</Text>
            <Badge label={`${roadmapProgress}% Ukończono`} variant="info" />
          </View>
          <View className="mt-2">
            <ProgressBar value={roadmapProgress} label="" />
          </View>
          <View className="mt-3 flex-row items-center justify-between border-t border-slate-100 pt-2.5">
            <Text className="text-xs text-slate-500">
              Ukończono {completedMilestones} z {generatedMilestones.length} kamieni milowych
            </Text>
            <Text className="text-xs font-semibold text-primary-700">
              Tydzień 2 w trakcie
            </Text>
          </View>

          {/* Job Target Gap */}
          <View className="mt-3 rounded-xl bg-slate-50 p-3 border border-slate-100">
            <View className="flex-row items-center justify-between">
              <Text className="text-xs font-bold text-slate-800">
                Luka do oferty docelowej:
              </Text>
              <Text className="text-xs font-bold text-primary-700">
                {topJob.matchScore}% dopasowania
              </Text>
            </View>
            <Text className="mt-1 text-xs leading-4 text-slate-500">
              Do odblokowania górnych widełek w {topJob.company} brakuje modułu ewaluacji i architektury
              systemowej (Milestone 3).
            </Text>
          </View>
        </Card>

        {/* 1. KAMIENIE MILOWE (Milestones) */}
        <View className="mt-7">
          <View className="flex-row items-center justify-between">
            <View>
              <Text className="text-lg font-bold text-slate-900">Kamienie milowe</Text>
              <Text className="text-xs text-slate-500">
                Kluczowe etapy weryfikowane przez rekruterów i rynek
              </Text>
            </View>
            <Ionicons name="flag" size={18} color="#4f46e5" />
          </View>

          <View className="mt-3 gap-3">
            {generatedMilestones.map((milestone) => (
              <MilestoneCard key={milestone.id} milestone={milestone} />
            ))}
          </View>
        </View>

        {/* 2. OŚ CZASU (Timeline) */}
        <View className="mt-8">
          <View className="flex-row items-center justify-between mb-3">
            <View>
              <Text className="text-lg font-bold text-slate-900">Oś czasu (Tydzień po tygodniu)</Text>
              <Text className="text-xs text-slate-500">
                Krok po kroku do pełnej gotowości na rynku pracy
              </Text>
            </View>
            <Ionicons name="git-commit-outline" size={20} color="#4f46e5" />
          </View>

          <View className="mt-1">
            {generatedRoadmap.map((item, index) => (
              <TimelineNode
                key={item.id}
                item={item}
                isLast={index === generatedRoadmap.length - 1}
              />
            ))}
          </View>
        </View>

        {/* Quick bottom action */}
        <View className="mt-6">
          <Button
            label="Przejdź do dzisiejszego planu"
            onPress={() => navigation.navigate('Today')}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

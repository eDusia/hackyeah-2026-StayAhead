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
import { getTranslations } from '@/i18n/translations';
import { generatedMilestones, generatedRoadmap } from '@/mock/generatedRoadmap';
import { curatedDailyOffers } from '@/mock/jobsData';
import { useUserStore } from '@/store/useUserStore';
import type { MainTabParamList } from '@/types';
import { calculateCompletionRate, calculateMarketMatch } from '@/utils/helpers';

export function RoadmapScreen() {
  const navigation = useNavigation<BottomTabNavigationProp<MainTabParamList>>();
  const profile = useUserStore((state) => state.profile);
  const language = useUserStore((state) => state.language);
  const t = getTranslations(language);

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
            {t.roadmap.tagline}
          </Text>
          <Text className="mt-1 text-3xl font-bold text-slate-900">{t.roadmap.title}</Text>
          <Text className="mt-1 text-base text-slate-500">
            {t.roadmap.subtitlePrefix}{' '}
            <Text className="font-semibold text-slate-800">
              {profile.goal?.targetRole ?? 'AI Application Engineer'}
            </Text>
            .
          </Text>
        </View>

        {/* Global Progress Card */}
        <Card className="mt-4 p-4 shadow-sm">
          <View className="flex-row items-center justify-between">
            <Text className="text-sm font-bold text-slate-900">{t.roadmap.totalProgressHeader}</Text>
            <Badge label={t.roadmap.completedBadge(roadmapProgress)} variant="info" />
          </View>
          <View className="mt-2">
            <ProgressBar value={roadmapProgress} label="" />
          </View>
          <View className="mt-3 flex-row items-center justify-between border-t border-slate-100 pt-2.5">
            <Text className="text-xs text-slate-500">
              {t.roadmap.milestonesSummary(completedMilestones, generatedMilestones.length)}
            </Text>
            <Text className="text-xs font-semibold text-primary-700">
              {t.roadmap.currentWeekStatus}
            </Text>
          </View>

          {/* Job Target Gap */}
          <View className="mt-3 rounded-xl bg-slate-50 p-3 border border-slate-100">
            <View className="flex-row items-center justify-between">
              <Text className="text-xs font-bold text-slate-800">
                {t.roadmap.targetGapTitle}
              </Text>
              <Text className="text-xs font-bold text-primary-700">
                {t.roadmap.targetGapMatch(topJob.matchScore)}
              </Text>
            </View>
            <Text className="mt-1 text-xs leading-4 text-slate-500">
              {t.roadmap.targetGapDesc(topJob.company)}
            </Text>
          </View>
        </Card>

        {/* 1. KAMIENIE MILOWE (Milestones) */}
        <View className="mt-7">
          <View className="flex-row items-center justify-between">
            <View>
              <Text className="text-lg font-bold text-slate-900">{t.roadmap.milestonesHeader}</Text>
              <Text className="text-xs text-slate-500">
                {t.roadmap.milestonesSubheader}
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
              <Text className="text-lg font-bold text-slate-900">{t.roadmap.timelineHeader}</Text>
              <Text className="text-xs text-slate-500">
                {t.roadmap.timelineSubheader}
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
            label={t.roadmap.goToTodayAction}
            onPress={() => navigation.navigate('Today')}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

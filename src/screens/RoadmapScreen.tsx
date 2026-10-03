import { ScrollView, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { Card } from '@/components/common/Card';
import { ProgressBar } from '@/components/common/ProgressBar';
import { MilestoneCard } from '@/components/roadmap/MilestoneCard';
import { TimelineNode } from '@/components/roadmap/TimelineNode';
import { generatedMilestones, generatedRoadmap } from '@/mock/generatedRoadmap';
import { jobPostings } from '@/mock/jobPostings';
import { useUserStore } from '@/store/useUserStore';
import { calculateCompletionRate, calculateMarketMatch } from '@/utils/helpers';

export function RoadmapScreen() {
  const profile = useUserStore((state) => state.profile);
  const completedSteps = generatedRoadmap.filter((item) => item.status === 'completed').length;
  const roadmapProgress = calculateCompletionRate(completedSteps, generatedRoadmap.length);
  const topJob = jobPostings[0];
  const match = calculateMarketMatch(profile.skills, topJob.requiredSkills);

  return (
    <SafeAreaView className="flex-1 bg-slate-50">
      <ScrollView contentContainerClassName="px-5 pb-8">
        <Text className="mt-2 text-3xl font-bold text-slate-900">Twoja ścieżka</Text>
        <Text className="mt-1 text-base text-slate-500">
          Plan AI do roli {profile.goal?.targetRole ?? 'Twojego celu kariery'}.
        </Text>

        <Card className="mt-5">
          <ProgressBar value={roadmapProgress} label="Ukończone etapy" />
          <Text className="mt-3 text-sm leading-5 text-slate-500">
            Luka do {topJob.title}: {100 - match}% · najbardziej brakuje ewaluacji i system designu.
          </Text>
        </Card>

        <Text className="mb-3 mt-7 text-lg font-semibold text-slate-900">Kamienie milowe</Text>
        <View className="gap-3">
          {generatedMilestones.map((milestone) => (
            <MilestoneCard key={milestone.id} milestone={milestone} />
          ))}
        </View>

        <Text className="mb-3 mt-7 text-lg font-semibold text-slate-900">Oś czasu</Text>
        <View>
          {generatedRoadmap.map((item, index) => (
            <TimelineNode key={item.id} item={item} isLast={index === generatedRoadmap.length - 1} />
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

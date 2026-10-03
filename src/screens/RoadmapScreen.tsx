import { ScrollView, Text, View } from 'react-native';
import Animated, { FadeInDown } from 'react-native-reanimated';
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
    <SafeAreaView className="flex-1 bg-slate-950" edges={['top', 'left', 'right']}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerClassName="px-5 pb-28 pt-2"
      >
        <Animated.View entering={FadeInDown.duration(400)}>
          <Text className="text-3xl font-extrabold tracking-tight text-slate-100">Twoja ścieżka</Text>
          <Text className="mt-1 text-base text-slate-400">
            Dedykowana ścieżka AI do roli{' '}
            <Text className="font-semibold text-indigo-400">
              {profile.goal?.targetRole ?? 'Twojego celu kariery'}
            </Text>
            .
          </Text>
        </Animated.View>

        <Animated.View entering={FadeInDown.delay(100).duration(400)} className="mt-5">
          <Card>
            <ProgressBar value={roadmapProgress} label="Ukończone etapy ścieżki" variant="indigo" />
            <View className="mt-3.5 border-t border-slate-800/80 pt-3">
              <Text className="text-sm leading-5 text-slate-300">
                Luka do <Text className="font-semibold text-slate-100">{topJob.title}</Text>: {100 - match}% ·
                najbardziej brakuje ewaluacji modeli i system designu.
              </Text>
            </View>
          </Card>
        </Animated.View>

        <Animated.View entering={FadeInDown.delay(200).duration(400)} className="mt-8">
          <Text className="mb-3.5 text-lg font-bold tracking-tight text-slate-100">Kamienie milowe</Text>
          <View className="gap-3.5">
            {generatedMilestones.map((milestone) => (
              <MilestoneCard key={milestone.id} milestone={milestone} />
            ))}
          </View>
        </Animated.View>

        <Animated.View entering={FadeInDown.delay(300).duration(400)} className="mt-8">
          <Text className="mb-3.5 text-lg font-bold tracking-tight text-slate-100">Oś czasu realizacji</Text>
          <View>
            {generatedRoadmap.map((item, index) => (
              <TimelineNode key={item.id} item={item} isLast={index === generatedRoadmap.length - 1} />
            ))}
          </View>
        </Animated.View>
      </ScrollView>
    </SafeAreaView>
  );
}

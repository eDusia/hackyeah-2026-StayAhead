import { Ionicons } from '@expo/vector-icons';
import { ScrollView, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { Badge } from '@/components/common/Badge';
import { Button } from '@/components/common/Button';
import { Card } from '@/components/common/Card';
import {
  CAREER_DOMAIN_LABELS,
  GOAL_TYPE_LABELS,
  TIME_COMMITMENT_LABELS,
} from '@/constants/theme';
import { jobPostings } from '@/mock/jobPostings';
import { useChatStore } from '@/store/useChatStore';
import { useTaskStore } from '@/store/useTaskStore';
import { useUserStore } from '@/store/useUserStore';
import { daysUntil, formatDate } from '@/utils/date';
import { calculateMarketMatch, pluralize } from '@/utils/helpers';

export function ProfileScreen() {
  const { profile, resetProfile } = useUserStore();
  const { streak, refreshDailyTasks } = useTaskStore();
  const clearChat = useChatStore((state) => state.clearChat);
  const daysToGoal = daysUntil(profile.goal?.targetDate);
  const match = calculateMarketMatch(profile.skills, jobPostings[0].requiredSkills);

  const resetAll = () => {
    resetProfile();
    refreshDailyTasks();
    clearChat();
  };

  const domainDisplay = profile.goal?.customDomain
    ? profile.goal.customDomain
    : profile.goal
    ? CAREER_DOMAIN_LABELS[profile.goal.domain]
    : 'Brak domeny';

  const goalTypeDisplay = profile.goal?.customGoalType
    ? profile.goal.customGoalType
    : profile.goal?.goalType
    ? GOAL_TYPE_LABELS[profile.goal.goalType]
    : null;

  const timeCommitmentDisplay = profile.goal?.timeCommitment
    ? TIME_COMMITMENT_LABELS[profile.goal.timeCommitment]
    : null;

  return (
    <SafeAreaView className="flex-1 bg-slate-50">
      <ScrollView contentContainerClassName="px-5 pb-10" showsVerticalScrollIndicator={false}>
        <Text className="mt-2 text-3xl font-bold text-slate-900">Profil</Text>
        <Text className="mt-1 text-base text-slate-500">Twoje cele, passa i ustawienia aplikacji.</Text>

        <Card className="mt-5">
          <Text className="text-2xl font-bold text-slate-900">{profile.name}</Text>
          <Text className="mt-1 text-base text-slate-500">{profile.headline}</Text>
          {profile.currentRole ? <Text className="mt-1 text-sm text-slate-400">Teraz: {profile.currentRole}</Text> : null}
          <View className="mt-4 flex-row flex-wrap gap-2">
            {profile.skills.map((skill) => (
              <Badge key={skill} label={skill} variant="info" />
            ))}
          </View>
        </Card>

        <Card className="mt-4">
          <Text className="text-lg font-semibold text-slate-900">Cel kariery</Text>
          <Text className="mt-2 text-base font-bold text-slate-900">{profile.goal?.targetRole}</Text>

          {goalTypeDisplay ? (
            <View className="mt-2 flex-row items-center gap-1.5">
              <Ionicons name="flag-outline" size={15} color="#4f46e5" />
              <Text className="text-sm font-semibold text-primary-700">{goalTypeDisplay}</Text>
            </View>
          ) : null}

          <Text className="mt-2 text-sm text-slate-500">
            Obszar: <Text className="font-medium text-slate-700">{domainDisplay}</Text>
          </Text>

          {timeCommitmentDisplay ? (
            <Text className="mt-1 text-sm text-slate-500">
              Rytm nauki: <Text className="font-medium text-slate-700">{timeCommitmentDisplay}</Text>
            </Text>
          ) : null}

          {profile.goal?.targetDate ? (
            <Text className="mt-2 text-sm text-slate-500">
              Deadline: {formatDate(profile.goal.targetDate)}
              {daysToGoal !== null
                ? ` · ${daysToGoal} ${pluralize(daysToGoal, 'dzień', 'dni', 'dni')} do celu`
                : ''}
            </Text>
          ) : null}
          <Text className="mt-3 text-sm text-slate-500">Dopasowanie do najbliższej oferty: {match}%</Text>
        </Card>

        <Card className="mt-4">
          <Text className="text-lg font-semibold text-slate-900">Ustawienia</Text>
          <Text className="mt-1 text-sm text-slate-500">Aktualna passa: {streak} dni. Reset wraca do onboardingu.</Text>
          <Button className="mt-4" label="Zresetuj profil i plan" variant="outline" onPress={resetAll} />
        </Card>
      </ScrollView>
    </SafeAreaView>
  );
}

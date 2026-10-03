import { ScrollView, Text, View } from 'react-native';
import Animated, { FadeInDown } from 'react-native-reanimated';
import { SafeAreaView } from 'react-native-safe-area-context';

import { Badge } from '@/components/common/Badge';
import { Button } from '@/components/common/Button';
import { Card } from '@/components/common/Card';
import { CAREER_DOMAIN_LABELS, SKILL_LEVEL_LABELS } from '@/constants/theme';
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

  return (
    <SafeAreaView className="flex-1 bg-slate-950" edges={['top', 'left', 'right']}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerClassName="px-5 pb-28 pt-2"
      >
        <Animated.View entering={FadeInDown.duration(400)}>
          <Text className="text-3xl font-extrabold tracking-tight text-slate-100">Profil</Text>
          <Text className="mt-1 text-base text-slate-400">Twoje cele, passa i ustawienia aplikacji.</Text>
        </Animated.View>

        <Animated.View entering={FadeInDown.delay(100).duration(400)} className="mt-5">
          <Card>
            <View className="flex-row items-center justify-between">
              <View>
                <Text className="text-2xl font-bold text-slate-100">{profile.name || 'Użytkownik'}</Text>
                <Text className="mt-0.5 text-sm font-medium text-indigo-400">{profile.headline}</Text>
              </View>
              <View className="h-12 w-12 items-center justify-center rounded-2xl border border-indigo-500/40 bg-indigo-950/60">
                <Text className="text-xl font-black text-indigo-300">
                  {(profile.name || 'U').slice(0, 1).toUpperCase()}
                </Text>
              </View>
            </View>
            {profile.currentRole ? (
              <Text className="mt-2 text-xs font-semibold uppercase tracking-wider text-slate-400">
                Obecnie: <Text className="text-slate-300">{profile.currentRole}</Text>
              </Text>
            ) : null}
            <View className="mt-4 flex-row flex-wrap gap-2">
              {profile.skills.map((skill) => (
                <Badge key={skill} label={skill} variant="info" />
              ))}
            </View>
          </Card>
        </Animated.View>

        <Animated.View entering={FadeInDown.delay(200).duration(400)} className="mt-4">
          <Card>
            <Text className="text-lg font-bold text-slate-100">Cel kariery</Text>
            <Text className="mt-2 text-base font-semibold text-slate-200">{profile.goal?.targetRole}</Text>
            <Text className="mt-1 text-sm text-slate-400">
              {profile.goal ? CAREER_DOMAIN_LABELS[profile.goal.domain] : 'Brak domeny'} ·{' '}
              {profile.goal ? SKILL_LEVEL_LABELS[profile.goal.currentLevel] : 'brak poziomu'}
            </Text>
            {profile.goal?.targetDate ? (
              <Text className="mt-2 text-sm text-slate-400">
                Deadline: <Text className="font-semibold text-slate-200">{formatDate(profile.goal.targetDate)}</Text>
                {daysToGoal !== null
                  ? ` · ${daysToGoal} ${pluralize(daysToGoal, 'dzień', 'dni', 'dni')} do celu`
                  : ''}
              </Text>
            ) : null}
            <View className="mt-3.5 border-t border-slate-800/80 pt-3">
              <Text className="text-sm font-medium text-slate-300">
                Dopasowanie do rynku: <Text className="font-bold text-emerald-400">{match}%</Text>
              </Text>
            </View>
          </Card>
        </Animated.View>

        <Animated.View entering={FadeInDown.delay(300).duration(400)} className="mt-4">
          <Card>
            <Text className="text-lg font-bold text-slate-100">Ustawienia & Aktywność</Text>
            <Text className="mt-1 text-sm text-slate-400">
              Aktualna passa: <Text className="font-bold text-indigo-400">{streak} dni</Text>. Reset przywraca
              aplikację do stanu onboardingu.
            </Text>
            <Button
              className="mt-4"
              label="Zresetuj profil i plan"
              variant="outline"
              onPress={resetAll}
            />
          </Card>
        </Animated.View>
      </ScrollView>
    </SafeAreaView>
  );
}

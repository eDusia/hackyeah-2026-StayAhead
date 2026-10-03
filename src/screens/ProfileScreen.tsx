import { Ionicons } from '@expo/vector-icons';
import { Pressable, ScrollView, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { Badge } from '@/components/common/Badge';
import { Button } from '@/components/common/Button';
import { Card } from '@/components/common/Card';
import {
  CAREER_DOMAIN_LABELS,
  GOAL_TYPE_LABELS,
  TIME_COMMITMENT_LABELS,
} from '@/constants/theme';
import { getTranslations } from '@/i18n/translations';
import { jobPostings } from '@/mock/jobPostings';
import { useChatStore } from '@/store/useChatStore';
import { useTaskStore } from '@/store/useTaskStore';
import { useUserStore } from '@/store/useUserStore';
import { daysUntil, formatDate } from '@/utils/date';
import { calculateMarketMatch, pluralize } from '@/utils/helpers';

export function ProfileScreen() {
  const { profile, resetProfile, language, setLanguage } = useUserStore();
  const t = getTranslations(language);
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
    ? (t.onboarding.step3.domains[profile.goal.domain] ?? CAREER_DOMAIN_LABELS[profile.goal.domain])
    : (language === 'en' ? 'None' : 'Brak');

  const goalTypeDisplay = profile.goal?.customGoalType
    ? profile.goal.customGoalType
    : profile.goal?.goalType
    ? (t.onboarding.step1.goals[profile.goal.goalType]?.label ?? GOAL_TYPE_LABELS[profile.goal.goalType])
    : null;

  const timeCommitmentDisplay = profile.goal?.timeCommitment
    ? (t.onboarding.step5.commitments[profile.goal.timeCommitment]?.label ?? TIME_COMMITMENT_LABELS[profile.goal.timeCommitment])
    : null;

  return (
    <SafeAreaView className="flex-1 bg-slate-50">
      <ScrollView contentContainerClassName="px-5 pb-10" showsVerticalScrollIndicator={false}>
        <Text className="mt-2 text-3xl font-black tracking-tight text-slate-900">
          {t.tabs.profile}
        </Text>
        <Text className="mt-1 text-sm font-medium text-slate-500">
          {language === 'en'
            ? 'Your goals, streak, and app settings.'
            : 'Twoje cele, passa i ustawienia aplikacji.'}
        </Text>

        <Card className="mt-5 border-slate-100 shadow-sm">
          <View className="flex-row items-center gap-3">
            <View className="h-12 w-12 items-center justify-center rounded-full border-2 border-primary-200 bg-primary-100">
              <Text className="text-xl font-bold text-primary-700">
                {(profile.name || 'A').slice(0, 1).toUpperCase()}
              </Text>
            </View>
            <View className="flex-1">
              <Text className="text-xl font-bold text-slate-900">{profile.name || 'Alex'}</Text>
              <Text className="text-xs text-slate-500">{profile.headline}</Text>
            </View>
          </View>
          {profile.currentRole ? (
            <Text className="mt-2.5 text-xs text-slate-400">
              {language === 'en' ? 'Current: ' : 'Teraz: '}{profile.currentRole}
            </Text>
          ) : null}
          <View className="mt-3.5 flex-row flex-wrap gap-2">
            {profile.skills.map((skill) => (
              <Badge key={skill} label={skill} variant="info" />
            ))}
          </View>
        </Card>

        {/* Goal details */}
        <Card className="mt-4 border-slate-100 shadow-sm">
          <Text className="text-base font-bold text-slate-900">
            {language === 'en' ? 'Career Goal' : 'Cel kariery'}
          </Text>
          <Text className="mt-1.5 text-base font-bold text-primary-900">
            {profile.goal?.targetRole ?? 'AI Application Engineer'}
          </Text>

          {goalTypeDisplay ? (
            <View className="mt-2 flex-row items-center gap-1.5">
              <Ionicons name="flag-outline" size={15} color="#4f46e5" />
              <Text className="text-xs font-semibold text-primary-700">{goalTypeDisplay}</Text>
            </View>
          ) : null}

          <Text className="mt-2.5 text-xs text-slate-600">
            {t.profile.domain} <Text className="font-semibold text-slate-900">{domainDisplay}</Text>
          </Text>

          {timeCommitmentDisplay ? (
            <Text className="mt-1 text-xs text-slate-600">
              {t.profile.rhythm} <Text className="font-semibold text-slate-900">{timeCommitmentDisplay}</Text>
            </Text>
          ) : null}

          {profile.goal?.targetDate ? (
            <Text className="mt-1.5 text-xs text-slate-600">
              {t.profile.deadline} {formatDate(profile.goal.targetDate)}
              {daysToGoal !== null
                ? ` · ${t.profile.daysToGoal(daysToGoal)}`
                : ''}
            </Text>
          ) : null}
          <Text className="mt-2.5 text-xs font-medium text-slate-500">
            {t.profile.matchScore(match)}
          </Text>
        </Card>

        {/* Settings & Language */}
        <Card className="mt-4 border-slate-100 shadow-sm">
          <Text className="text-base font-bold text-slate-900">
            {t.profile.settingsTitle}
          </Text>

          {/* Language Selector */}
          <View className="mt-3.5 border-b border-slate-100 pb-4">
            <Text className="text-xs font-semibold uppercase tracking-wider text-slate-500">
              {t.profile.languageSetting}
            </Text>
            <View className="mt-2 flex-row items-center gap-2">
              <Pressable
                onPress={() => setLanguage('pl')}
                className={`flex-1 flex-row items-center justify-center gap-2 rounded-2xl border py-2.5 ${
                  language === 'pl'
                    ? 'border-primary-600 bg-primary-50'
                    : 'border-slate-200 bg-white'
                }`}
              >
                <Text className="text-base">🇵🇱</Text>
                <Text
                  className={`text-xs font-bold ${
                    language === 'pl' ? 'text-primary-900' : 'text-slate-700'
                  }`}
                >
                  Polski
                </Text>
              </Pressable>

              <Pressable
                onPress={() => setLanguage('en')}
                className={`flex-1 flex-row items-center justify-center gap-2 rounded-2xl border py-2.5 ${
                  language === 'en'
                    ? 'border-primary-600 bg-primary-50'
                    : 'border-slate-200 bg-white'
                }`}
              >
                <Text className="text-base">🇬🇧</Text>
                <Text
                  className={`text-xs font-bold ${
                    language === 'en' ? 'text-primary-900' : 'text-slate-700'
                  }`}
                >
                  English
                </Text>
              </Pressable>
            </View>
          </View>

          <Text className="mt-3 text-xs text-slate-500">
            {t.profile.currentStreak(streak)}
          </Text>
          <Button
            className="mt-3"
            label={t.profile.resetButton}
            variant="outline"
            onPress={resetAll}
          />
        </Card>
      </ScrollView>
    </SafeAreaView>
  );
}

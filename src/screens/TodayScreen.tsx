import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import type { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import { Pressable, ScrollView, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { Badge } from '@/components/common/Badge';
import { Card } from '@/components/common/Card';
import { ProgressBar } from '@/components/common/ProgressBar';
import { AgentStatusBadge } from '@/components/dashboard/AgentStatusBadge';
import { DailyTaskCard } from '@/components/dashboard/DailyTaskCard';
import { StreakCard } from '@/components/dashboard/StreakCard';
import { getTranslations } from '@/i18n/translations';
import { useChatStore } from '@/store/useChatStore';
import { useTaskStore } from '@/store/useTaskStore';
import { useUserStore } from '@/store/useUserStore';
import type { MainTabParamList } from '@/types';
import { formatWeekdayDate } from '@/utils/date';
import { calculateCompletionRate } from '@/utils/helpers';

export function TodayScreen() {
  const navigation = useNavigation<BottomTabNavigationProp<MainTabParamList>>();
  const profile = useUserStore((state) => state.profile);
  const language = useUserStore((state) => state.language);
  const t = getTranslations(language);

  const { tasks, streak, toggleTaskCompletion } = useTaskStore();
  const agentStatus = useChatStore((state) => state.agentStatus);

  const completed = tasks.filter((task) => task.status === 'done').length;
  const progress = calculateCompletionRate(completed, tasks.length);
  const isAllDone = tasks.length > 0 && completed === tasks.length;

  const currentHour = new Date().getHours();
  const greeting =
    currentHour < 12
      ? t.today.greetingMorning
      : currentHour < 18
      ? t.today.greetingAfternoon
      : t.today.greetingEvening;

  const displayName = profile.name?.trim() ? profile.name.trim() : 'Alex';
  const initial = displayName.charAt(0).toUpperCase();

  // First active task or first task for the Daily Focus showcase
  const focusTask = tasks.find((t) => t.status !== 'done') ?? tasks[0];
  const isFocusTaskDone = focusTask?.status === 'done';

  return (
    <SafeAreaView className="flex-1 bg-slate-50">
      <ScrollView contentContainerClassName="px-5 pb-10" showsVerticalScrollIndicator={false}>
        {/* Top Header: Greeting, Subtitle and Avatar (as in cover mockup) */}
        <View className="mt-3 flex-row items-center justify-between">
          <View className="flex-1 pr-3">
            <Text className="text-2xl font-black tracking-tight text-slate-900">
              {greeting}, {displayName} 👋
            </Text>
            <Text className="mt-0.5 text-sm font-medium text-slate-500">
              {t.today.encouragement}
            </Text>
          </View>

          {/* User Profile Avatar */}
          <Pressable
            onPress={() => navigation.navigate('Profile')}
            className="h-11 w-11 items-center justify-center rounded-full border-2 border-primary-200 bg-primary-100 shadow-2xs active:opacity-80"
          >
            <Text className="text-base font-bold text-primary-700">{initial}</Text>
          </Pressable>
        </View>

        {/* Daily Focus Card (Indigo container with inner showcase card from cover) */}
        <View className="mt-4 rounded-3xl bg-indigo-900 p-4 shadow-sm">
          {/* Header row */}
          <View className="flex-row items-center justify-between">
            <View className="flex-row items-center gap-2">
              <Ionicons name="calendar" size={17} color="#c7d2fe" />
              <View>
                <Text className="text-base font-bold text-white">
                  {t.today.dailyFocusBadge}
                </Text>
                <Text className="text-xs text-indigo-200">
                  {t.today.dailyFocusSubtitle}
                </Text>
              </View>
            </View>
            <AgentStatusBadge status={agentStatus} />
          </View>

          {/* Inner Highlight Card */}
          {focusTask ? (
            <View className="mt-3.5 rounded-2xl bg-white p-3.5 shadow-2xs">
              <View className="flex-row items-start justify-between gap-3">
                <View className="flex-1">
                  <Text
                    className={`text-base font-bold ${
                      isFocusTaskDone ? 'text-slate-400 line-through' : 'text-slate-900'
                    }`}
                  >
                    {focusTask.title}
                  </Text>
                  <Text className="mt-1 text-xs leading-4 text-slate-500">
                    {focusTask.description}
                  </Text>
                </View>
                <Pressable
                  onPress={() => toggleTaskCompletion(focusTask.id)}
                  className={`h-7 w-7 items-center justify-center rounded-full border ${
                    isFocusTaskDone
                      ? 'border-emerald-600 bg-emerald-600'
                      : 'border-slate-300 bg-white active:bg-slate-50'
                  }`}
                >
                  {isFocusTaskDone ? (
                    <Ionicons name="checkmark" size={16} color="#ffffff" />
                  ) : null}
                </Pressable>
              </View>

              {/* Progress inside daily focus */}
              <View className="mt-3.5 border-t border-slate-100 pt-2.5">
                <View className="mb-1.5 flex-row items-center justify-between">
                  <Text className="text-[11px] font-semibold text-slate-500">
                    {language === 'en' ? 'Progress' : 'Postęp'}
                  </Text>
                  <Text className="text-[11px] font-bold text-slate-700">
                    {t.today.tasksCount(completed, tasks.length)}
                  </Text>
                </View>
                <ProgressBar value={progress} />
              </View>
            </View>
          ) : null}
        </View>

        {/* Streak Card (7-day weekday circles directly as on cover) */}
        <StreakCard
          streak={streak}
          isTodayDone={isAllDone}
          language={language}
          className="mt-4"
        />

        {/* Your Career Roadmap (Mini preview from cover mockup) */}
        <Card className="mt-4 p-4 shadow-sm border border-slate-100">
          <View className="flex-row items-center justify-between">
            <Text className="text-base font-bold text-slate-900">
              {language === 'en' ? 'Your Career Roadmap' : 'Twoja ścieżka kariery'}
            </Text>
            <Pressable
              onPress={() => navigation.navigate('Roadmap')}
              className="flex-row items-center gap-0.5 active:opacity-70"
            >
              <Text className="text-xs font-semibold text-primary-600">
                {language === 'en' ? 'View full roadmap' : 'Zobacz pełną ścieżkę'}
              </Text>
              <Ionicons name="chevron-forward" size={13} color="#4f46e5" />
            </Pressable>
          </View>

          {/* Timeline points */}
          <View className="mt-3.5 pl-1">
            {/* Step 1 */}
            <View className="flex-row items-start gap-3">
              <View className="items-center">
                <View className="h-4 w-4 items-center justify-center rounded-full border-2 border-primary-600 bg-white">
                  <View className="h-1.5 w-1.5 rounded-full bg-primary-600" />
                </View>
                <View className="h-7 w-0.5 bg-primary-200" />
              </View>
              <View className="flex-1 pb-2">
                <Text className="text-xs font-bold text-slate-900">
                  {language === 'en' ? 'Reflect & Refocus' : 'Podsumowanie i nowe cele'}
                </Text>
                <Text className="text-[11px] text-slate-500">
                  {language === 'en' ? 'Define your goals and priorities' : 'Określ swoje cele i priorytety'}
                </Text>
              </View>
            </View>

            {/* Step 2 */}
            <View className="flex-row items-start gap-3">
              <View className="items-center">
                <View className="h-4 w-4 items-center justify-center rounded-full border-2 border-primary-600 bg-primary-600">
                  <Ionicons name="checkmark" size={10} color="#ffffff" />
                </View>
                <View className="h-7 w-0.5 bg-primary-200" />
              </View>
              <View className="flex-1 pb-2">
                <Text className="text-xs font-bold text-slate-900">
                  {language === 'en' ? 'Refresh Your Skills' : 'Aktualizacja umiejętności'}
                </Text>
                <Text className="text-[11px] text-slate-500">
                  {language === 'en' ? 'Update skills and build confidence' : 'Poznaj nowe narzędzia i zbuduj pewność'}
                </Text>
              </View>
            </View>

            {/* Step 3 */}
            <View className="flex-row items-start gap-3">
              <View className="items-center">
                <View className="h-4 w-4 items-center justify-center rounded-full border-2 border-slate-300 bg-white" />
              </View>
              <View className="flex-1">
                <Text className="text-xs font-bold text-slate-900">
                  {language === 'en' ? 'Re-enter with Support' : 'Powrót ze wsparciem'}
                </Text>
                <Text className="text-[11px] text-slate-500">
                  {language === 'en' ? 'Find opportunities and grow your network' : 'Odkryj oferty i rozwijaj sieć kontaktów'}
                </Text>
              </View>
            </View>
          </View>
        </Card>

        {/* Task List Header */}
        <View className="mt-6 flex-row items-center justify-between">
          <View>
            <Text className="text-lg font-bold text-slate-900">{t.today.tasksHeader}</Text>
            <Text className="text-xs text-slate-500">
              {t.today.tasksSubheader}
            </Text>
          </View>
          <Text className="text-xs font-semibold text-primary-600">
            {t.today.studyTime}
          </Text>
        </View>

        {/* Tasks List */}
        <View className="mt-3 gap-3">
          {tasks.map((task) => (
            <DailyTaskCard key={task.id} task={task} onToggle={toggleTaskCompletion} />
          ))}
        </View>

        {/* Quick Navigation Cards */}
        <View className="mt-7">
          <Text className="text-sm font-bold uppercase tracking-wider text-slate-400">
            {t.today.quickActionsTitle}
          </Text>
          <View className="mt-2.5 gap-2.5">
            <Pressable
              onPress={() => navigation.navigate('Messages')}
              className="active:opacity-90"
            >
              <Card className="flex-row items-center justify-between p-3.5">
                <View className="flex-row items-center gap-3">
                  <View className="h-10 w-10 items-center justify-center rounded-2xl bg-primary-100">
                    <Ionicons name="chatbubbles" size={20} color="#4f46e5" />
                  </View>
                  <View>
                    <Text className="text-sm font-bold text-slate-900">
                      {t.today.actionMentorTitle}
                    </Text>
                    <Text className="text-xs text-slate-500">
                      {t.today.actionMentorDesc}
                    </Text>
                  </View>
                </View>
                <Ionicons name="chevron-forward" size={18} color="#94a3b8" />
              </Card>
            </Pressable>

            <Pressable
              onPress={() => navigation.navigate('Roadmap')}
              className="active:opacity-90"
            >
              <Card className="flex-row items-center justify-between p-3.5">
                <View className="flex-row items-center gap-3">
                  <View className="h-10 w-10 items-center justify-center rounded-full bg-emerald-100">
                    <Ionicons name="map" size={18} color="#059669" />
                  </View>
                  <View>
                    <Text className="text-sm font-bold text-slate-900">
                      {t.today.actionRoadmapTitle}
                    </Text>
                    <Text className="text-xs text-slate-500">
                      {t.today.actionRoadmapDesc}
                    </Text>
                  </View>
                </View>
                <Ionicons name="chevron-forward" size={18} color="#94a3b8" />
              </Card>
            </Pressable>

            <Pressable
              onPress={() => navigation.navigate('Jobs')}
              className="active:opacity-90"
            >
              <Card className="flex-row items-center justify-between p-3.5">
                <View className="flex-row items-center gap-3">
                  <View className="h-10 w-10 items-center justify-center rounded-full bg-amber-100">
                    <Ionicons name="briefcase" size={18} color="#d97706" />
                  </View>
                  <View>
                    <Text className="text-sm font-bold text-slate-900">
                      {t.today.actionJobsTitle}
                    </Text>
                    <Text className="text-xs text-slate-500">
                      {t.today.actionJobsDesc}
                    </Text>
                  </View>
                </View>
                <Ionicons name="chevron-forward" size={18} color="#94a3b8" />
              </Card>
            </Pressable>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

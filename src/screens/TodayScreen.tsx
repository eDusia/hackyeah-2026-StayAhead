import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import type { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import { Pressable, ScrollView, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { Badge } from '@/components/common/Badge';
import { Button } from '@/components/common/Button';
import { Card } from '@/components/common/Card';
import { ProgressBar } from '@/components/common/ProgressBar';
import { AgentStatusBadge } from '@/components/dashboard/AgentStatusBadge';
import { DailyTaskCard } from '@/components/dashboard/DailyTaskCard';
import { useChatStore } from '@/store/useChatStore';
import { useTaskStore } from '@/store/useTaskStore';
import { useUserStore } from '@/store/useUserStore';
import type { MainTabParamList } from '@/types';
import { formatWeekdayDate, greetingForNow } from '@/utils/date';
import { calculateCompletionRate, pluralize } from '@/utils/helpers';

export function TodayScreen() {
  const navigation = useNavigation<BottomTabNavigationProp<MainTabParamList>>();
  const profile = useUserStore((state) => state.profile);
  const { tasks, streak, toggleTaskCompletion } = useTaskStore();
  const agentStatus = useChatStore((state) => state.agentStatus);

  const completed = tasks.filter((task) => task.status === 'done').length;
  const progress = calculateCompletionRate(completed, tasks.length);

  return (
    <SafeAreaView className="flex-1 bg-slate-50">
      <ScrollView contentContainerClassName="px-5 pb-10" showsVerticalScrollIndicator={false}>
        {/* Top Header & Streak */}
        <View className="mt-2 flex-row items-start justify-between">
          <View className="flex-1 pr-3">
            <Text className="text-xs font-semibold uppercase tracking-wider text-primary-600">
              {formatWeekdayDate()}
            </Text>
            <Text className="mt-0.5 text-3xl font-bold text-slate-900">
              {greetingForNow()}
              {profile.name ? `, ${profile.name}` : ''}
            </Text>
            <Text className="mt-1 text-sm text-slate-500">
              Cel: <Text className="font-semibold text-slate-800">{profile.goal?.targetRole ?? 'AI Application Engineer'}</Text>
            </Text>
          </View>
          <View className="items-center rounded-2xl bg-amber-50 border border-amber-200/60 px-3 py-2">
            <View className="flex-row items-center gap-1">
              <Ionicons name="flame" size={16} color="#d97706" />
              <Text className="text-xs font-bold text-amber-800">Passa</Text>
            </View>
            <Text className="mt-0.5 text-lg font-bold text-amber-900">
              {streak} {pluralize(streak, 'dzień', 'dni', 'dni')}
            </Text>
          </View>
        </View>

        {/* Daily Progress Card */}
        <Card className="mt-4 p-4 shadow-sm">
          <ProgressBar
            value={progress}
            label={`Dzisiejsze zadania · ${completed} z ${tasks.length} ukończone`}
          />
          <View className="mt-3 flex-row items-center justify-between border-t border-slate-100 pt-2.5">
            <Text className="text-xs text-slate-500">
              {progress === 100
                ? '🎉 Wszystkie zadania na dziś zrealizowane!'
                : `Pozostało jeszcze ${tasks.length - completed} ${pluralize(
                    tasks.length - completed,
                    'zadanie',
                    'zadania',
                    'zadań'
                  )}`}
            </Text>
            <Badge
              label={progress === 100 ? 'Cel osiągnięty' : `${progress}%`}
              variant={progress === 100 ? 'success' : 'info'}
            />
          </View>
        </Card>

        {/* Daily Focus Card */}
        <Card className="mt-4 border-primary-100 bg-gradient-to-br from-white to-primary-50/40 p-4">
          <View className="flex-row items-center justify-between">
            <View className="flex-row items-center gap-1.5">
              <Ionicons name="sparkles" size={16} color="#4f46e5" />
              <Text className="text-xs font-bold uppercase tracking-wider text-primary-800">
                Główny fokus na dziś
              </Text>
            </View>
            <AgentStatusBadge status={agentStatus} />
          </View>
          <Text className="mt-2 text-base font-bold text-slate-900">
            Implementacja pętli Tool-Calling i test ewaluacji
          </Text>
          <Text className="mt-1 text-xs leading-5 text-slate-600">
            Dziś skupiamy się na przejściu z teorii promptów do deterministycznego kodu agenta. Zamknij
            dzisiejsze zadania, aby odblokować kolejny kamień milowy na ścieżce.
          </Text>
        </Card>

        {/* Task List Header */}
        <View className="mt-6 flex-row items-center justify-between">
          <View>
            <Text className="text-lg font-bold text-slate-900">Plan na dziś</Text>
            <Text className="text-xs text-slate-500">
              Dotknij zadania, aby oznaczyć jako wykonane
            </Text>
          </View>
          <Text className="text-xs font-semibold text-primary-600">
            ~45 min nauki
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
            Szybkie akcje
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
                      Zapytaj Mentora AI lub rekrutera
                    </Text>
                    <Text className="text-xs text-slate-500">
                      Rozwiąż wątpliwości lub zarezerwuj czas 1:1
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
                      Zobacz pełną ścieżkę rozwoju
                    </Text>
                    <Text className="text-xs text-slate-500">
                      Kamienie milowe i plan kolejnych tygodni
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
                      Sprawdź dzisiejsze oferty pracy
                    </Text>
                    <Text className="text-xs text-slate-500">
                      Zobacz, jak rośnie Twoje dopasowanie do stawek
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

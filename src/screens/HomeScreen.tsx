import { useNavigation } from '@react-navigation/native';
import type { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import { ScrollView, Text, View } from 'react-native';
import Animated, { FadeInDown } from 'react-native-reanimated';
import { SafeAreaView } from 'react-native-safe-area-context';

import { Button } from '@/components/common/Button';
import { Card } from '@/components/common/Card';
import { ProgressBar } from '@/components/common/ProgressBar';
import { AgentStatusBadge } from '@/components/dashboard/AgentStatusBadge';
import { DailyTaskCard } from '@/components/dashboard/DailyTaskCard';
import { TrendRadarCard } from '@/components/dashboard/TrendRadarCard';
import { marketTrends } from '@/mock/marketTrends';
import { useChatStore } from '@/store/useChatStore';
import { useTaskStore } from '@/store/useTaskStore';
import { useUserStore } from '@/store/useUserStore';
import type { MainTabParamList } from '@/types';
import { formatWeekdayDate, greetingForNow } from '@/utils/date';
import { calculateCompletionRate, pluralize } from '@/utils/helpers';

export function HomeScreen() {
  const navigation = useNavigation<BottomTabNavigationProp<MainTabParamList>>();
  const profile = useUserStore((state) => state.profile);
  const { tasks, streak, toggleTaskCompletion } = useTaskStore();
  const agentStatus = useChatStore((state) => state.agentStatus);

  const completed = tasks.filter((task) => task.status === 'done').length;
  const progress = calculateCompletionRate(completed, tasks.length);

  return (
    <SafeAreaView className="flex-1 bg-slate-950" edges={['top', 'left', 'right']}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerClassName="px-5 pb-28 pt-2"
      >
        <Animated.View entering={FadeInDown.duration(400)} className="flex-row items-start justify-between">
          <View className="flex-1 pr-3">
            <Text className="text-xs font-semibold uppercase tracking-wider text-slate-500">
              {formatWeekdayDate()}
            </Text>
            <Text className="mt-1 text-3xl font-extrabold tracking-tight text-slate-100">
              {greetingForNow()}
              {profile.name ? `, ${profile.name}` : ''}
            </Text>
            <Text className="mt-1 text-sm text-slate-400">
              Cel: <Text className="font-semibold text-indigo-400">{profile.goal?.targetRole ?? 'ustaw cel'}</Text>
            </Text>
          </View>
          <View className="items-center rounded-2xl border border-indigo-500/30 bg-indigo-950/50 px-3.5 py-2">
            <Text className="text-xs font-semibold tracking-wide text-indigo-400">Passa</Text>
            <Text className="text-lg font-black text-indigo-200">
              {streak} {pluralize(streak, 'dzień', 'dni', 'dni')}
            </Text>
          </View>
        </Animated.View>

        <Animated.View entering={FadeInDown.delay(100).duration(400)} className="mt-5">
          <Card>
            <ProgressBar
              value={progress}
              label={`Dzisiejsze zadania · ${completed}/${tasks.length}`}
              variant="emerald"
            />
          </Card>
        </Animated.View>

        <Animated.View entering={FadeInDown.delay(200).duration(400)} className="mt-7">
          <View className="flex-row items-center justify-between">
            <Text className="text-lg font-bold tracking-tight text-slate-100">Plan na dziś</Text>
            <AgentStatusBadge status={agentStatus} />
          </View>
          <View className="mt-3.5 gap-3">
            {tasks.map((task) => (
              <DailyTaskCard key={task.id} task={task} onToggle={toggleTaskCompletion} />
            ))}
          </View>
        </Animated.View>

        <Animated.View entering={FadeInDown.delay(300).duration(400)} className="mt-8">
          <Text className="mb-3.5 text-lg font-bold tracking-tight text-slate-100">Radar trendów</Text>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerClassName="gap-3 pr-2"
          >
            {marketTrends.map((trend) => (
              <TrendRadarCard key={trend.id} trend={trend} />
            ))}
          </ScrollView>
        </Animated.View>

        <Animated.View entering={FadeInDown.delay(400).duration(400)} className="mt-8">
          <Card variant="highlight">
            <View className="flex-row items-center gap-2">
              <View className="h-2 w-2 rounded-full bg-indigo-400" />
              <Text className="text-lg font-bold text-slate-100">Zapytaj mentora AI</Text>
            </View>
            <Text className="mt-2 text-sm leading-5 text-slate-300">
              Agent zna Twój profil i dzisiejsze zadania. Może skrócić plan, przygotować do rozmowy lub
              wskazać brakujące kompetencje do wymarzonej roli.
            </Text>
            <Button
              className="mt-4"
              label="Otwórz czat z agentem"
              onPress={() => navigation.navigate('AgentChat')}
            />
          </Card>
        </Animated.View>
      </ScrollView>
    </SafeAreaView>
  );
}

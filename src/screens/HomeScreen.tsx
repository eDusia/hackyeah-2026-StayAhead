import { useNavigation } from '@react-navigation/native';
import type { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import { ScrollView, Text, View } from 'react-native';
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
    <SafeAreaView className="flex-1 bg-slate-50">
      <ScrollView contentContainerClassName="px-5 pb-8">
        <View className="mt-2 flex-row items-start justify-between">
          <View className="flex-1 pr-3">
            <Text className="text-sm font-medium capitalize text-slate-500">{formatWeekdayDate()}</Text>
            <Text className="mt-1 text-3xl font-bold text-slate-900">
              {greetingForNow()}
              {profile.name ? `, ${profile.name}` : ''}
            </Text>
            <Text className="mt-1 text-base text-slate-500">
              Cel: {profile.goal?.targetRole ?? 'ustaw swoją target role'}
            </Text>
          </View>
          <View className="rounded-2xl bg-primary-50 px-3 py-2">
            <Text className="text-xs font-medium text-primary-700">Passa</Text>
            <Text className="text-lg font-bold text-primary-700">
              {streak} {pluralize(streak, 'dzień', 'dni', 'dni')}
            </Text>
          </View>
        </View>

        <Card className="mt-5">
          <ProgressBar value={progress} label={`Dzisiejsze zadania · ${completed}/${tasks.length}`} />
        </Card>

        <View className="mt-6 flex-row items-center justify-between">
          <Text className="text-lg font-semibold text-slate-900">Plan na dziś</Text>
          <AgentStatusBadge status={agentStatus} />
        </View>
        <View className="mt-3 gap-3">
          {tasks.map((task) => (
            <DailyTaskCard key={task.id} task={task} onToggle={toggleTaskCompletion} />
          ))}
        </View>

        <Text className="mb-3 mt-7 text-lg font-semibold text-slate-900">Radar trendów</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerClassName="gap-3 pr-2">
          {marketTrends.map((trend) => (
            <TrendRadarCard key={trend.id} trend={trend} />
          ))}
        </ScrollView>

        <Card className="mt-7">
          <Text className="text-lg font-semibold text-slate-900">Zapytaj mentora</Text>
          <Text className="mt-1 text-sm leading-5 text-slate-500">
            Agent zna Twój cel i dzisiejsze zadania. Może skrócić plan albo wskazać lukę do najbliższej oferty.
          </Text>
          <Button className="mt-4" label="Otwórz czat z agentem" onPress={() => navigation.navigate('AgentChat')} />
        </Card>
      </ScrollView>
    </SafeAreaView>
  );
}

import { Ionicons } from '@expo/vector-icons';
import { Text, View } from 'react-native';

import { Badge } from '@/components/common/Badge';
import { Card } from '@/components/common/Card';
import type { MarketTrend } from '@/types';
import { clampPercent, formatPercent } from '@/utils/helpers';

interface TrendRadarCardProps {
  trend: MarketTrend;
}

export function TrendRadarCard({ trend }: TrendRadarCardProps) {
  const demandPercent = clampPercent(trend.demandScore);

  return (
    <Card className="w-72 border-slate-800/80 bg-slate-900/80">
      <View className="mb-3 flex-row items-center justify-between">
        <Badge label={trend.category} variant="info" />
        <View className="flex-row items-center gap-1 rounded-full border border-emerald-500/30 bg-emerald-950/60 px-2 py-0.5">
          <Ionicons name="trending-up" size={13} color="#34d399" />
          <Text className="text-xs font-bold text-emerald-400">+{trend.growthPercent}%</Text>
        </View>
      </View>
      <Text className="text-lg font-bold text-slate-100">{trend.skill}</Text>
      <Text className="mt-1.5 text-sm leading-5 text-slate-400">{trend.summary}</Text>
      <View className="mt-4 pt-3 border-t border-slate-800/80">
        <View className="flex-row items-center justify-between">
          <Text className="text-xs font-medium uppercase tracking-wider text-slate-400">Popyt rynkowy</Text>
          <Text className="text-sm font-bold text-indigo-400">{formatPercent(trend.demandScore)}</Text>
        </View>
        <View className="mt-2 h-1.5 w-full overflow-hidden rounded-full bg-slate-800">
          <View
            className="h-full rounded-full bg-indigo-500"
            style={{ width: `${demandPercent}%` }}
          />
        </View>
      </View>
    </Card>
  );
}

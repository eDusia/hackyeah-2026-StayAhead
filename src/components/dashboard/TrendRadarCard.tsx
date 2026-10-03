import { Ionicons } from '@expo/vector-icons';
import { Text, View } from 'react-native';

import { Badge } from '@/components/common/Badge';
import { Card } from '@/components/common/Card';
import type { MarketTrend } from '@/types';
import { formatPercent } from '@/utils/helpers';

interface TrendRadarCardProps {
  trend: MarketTrend;
}

export function TrendRadarCard({ trend }: TrendRadarCardProps) {
  return (
    <Card className="w-64">
      <View className="mb-3 flex-row items-center justify-between">
        <Badge label={trend.category} variant="info" />
        <View className="flex-row items-center gap-1">
          <Ionicons name="trending-up" size={14} color="#0d9488" />
          <Text className="text-xs font-semibold text-success-700">+{trend.growthPercent}%</Text>
        </View>
      </View>
      <Text className="text-lg font-semibold text-slate-900">{trend.skill}</Text>
      <Text className="mt-2 text-sm leading-5 text-slate-500">{trend.summary}</Text>
      <View className="mt-4 flex-row items-center justify-between">
        <Text className="text-xs font-medium uppercase tracking-wide text-slate-400">Popyt rynkowy</Text>
        <Text className="text-sm font-semibold text-primary-700">{formatPercent(trend.demandScore)}</Text>
      </View>
    </Card>
  );
}

import { Text, View } from 'react-native';

import { Badge } from '@/components/common/Badge';
import { Card } from '@/components/common/Card';
import { ProgressBar } from '@/components/common/ProgressBar';
import type { Milestone, RoadmapItemStatus } from '@/types';

interface MilestoneCardProps {
  milestone: Milestone;
}

const statusLabel: Record<RoadmapItemStatus, string> = {
  completed: 'Ukończony',
  in_progress: 'W toku',
  upcoming: 'Nadchodzi',
  locked: 'Zablokowany',
};

const statusVariant: Record<RoadmapItemStatus, 'success' | 'info' | 'default' | 'warning'> = {
  completed: 'success',
  in_progress: 'info',
  upcoming: 'default',
  locked: 'warning',
};

export function MilestoneCard({ milestone }: MilestoneCardProps) {
  const isDone = milestone.status === 'completed';

  return (
    <Card className="border-slate-800/80 bg-slate-900/80">
      <View className="mb-3 flex-row items-start justify-between gap-3">
        <View className="flex-1">
          <Text className="text-lg font-bold text-slate-100">{milestone.title}</Text>
          <Text className="mt-1 text-sm leading-5 text-slate-400">{milestone.description}</Text>
        </View>
        <Badge label={statusLabel[milestone.status]} variant={statusVariant[milestone.status]} dot />
      </View>
      <Text className="mb-3 text-xs font-semibold uppercase tracking-wider text-slate-500">
        Cel: tydzień {milestone.targetWeek}
      </Text>
      <ProgressBar
        value={milestone.progress}
        label="Postęp kamienia milowego"
        variant={isDone ? 'emerald' : 'indigo'}
      />
      <View className="mt-3.5 flex-row flex-wrap gap-2">
        {milestone.skills.map((skill) => (
          <Badge key={skill} label={skill} />
        ))}
      </View>
    </Card>
  );
}

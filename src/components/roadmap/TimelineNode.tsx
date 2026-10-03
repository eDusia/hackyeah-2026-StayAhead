import { Ionicons } from '@expo/vector-icons';
import { Text, View } from 'react-native';

import type { RoadmapItem, RoadmapItemStatus } from '@/types';

interface TimelineNodeProps {
  item: RoadmapItem;
  isLast?: boolean;
}

const statusIcon: Record<RoadmapItemStatus, keyof typeof Ionicons.glyphMap> = {
  completed: 'checkmark',
  in_progress: 'play',
  upcoming: 'ellipse-outline',
  locked: 'lock-closed',
};

const nodeClass: Record<RoadmapItemStatus, string> = {
  completed: 'bg-success-600 border-success-600',
  in_progress: 'bg-primary-600 border-primary-600',
  upcoming: 'bg-white border-slate-300',
  locked: 'bg-slate-100 border-slate-200',
};

export function TimelineNode({ item, isLast = false }: TimelineNodeProps) {
  const muted = item.status === 'locked' || item.status === 'upcoming';

  return (
    <View className="flex-row">
      <View className="mr-3 items-center">
        <View className={`h-8 w-8 items-center justify-center rounded-full border ${nodeClass[item.status]}`}>
          <Ionicons
            name={statusIcon[item.status]}
            size={14}
            color={item.status === 'upcoming' || item.status === 'locked' ? '#64748b' : '#ffffff'}
          />
        </View>
        {isLast ? null : <View className="mt-1 w-0.5 flex-1 bg-slate-200" />}
      </View>
      <View className={`mb-5 flex-1 rounded-2xl bg-white p-3 ${muted ? 'opacity-70' : ''}`}>
        <Text className="text-xs font-semibold uppercase tracking-wide text-primary-600">Tydzień {item.week}</Text>
        <Text className="mt-1 text-base font-semibold text-slate-900">{item.title}</Text>
        <Text className="mt-1 text-sm leading-5 text-slate-500">{item.description}</Text>
        <Text className="mt-2 text-xs font-medium text-slate-400">{item.skills.join(' · ')}</Text>
      </View>
    </View>
  );
}

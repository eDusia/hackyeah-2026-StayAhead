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
  completed: 'bg-emerald-950/60 border-emerald-400/80',
  in_progress: 'bg-indigo-950/80 border-indigo-400',
  upcoming: 'bg-slate-900 border-slate-700',
  locked: 'bg-slate-950 border-slate-800',
};

const iconColor: Record<RoadmapItemStatus, string> = {
  completed: '#34d399',
  in_progress: '#a5b4fc',
  upcoming: '#64748b',
  locked: '#475569',
};

export function TimelineNode({ item, isLast = false }: TimelineNodeProps) {
  const muted = item.status === 'locked' || item.status === 'upcoming';
  const isActive = item.status === 'in_progress';

  return (
    <View className="flex-row">
      <View className="mr-3.5 items-center">
        <View className={`h-8 w-8 items-center justify-center rounded-full border ${nodeClass[item.status]}`}>
          <Ionicons
            name={statusIcon[item.status]}
            size={14}
            color={iconColor[item.status]}
          />
        </View>
        {isLast ? null : <View className="mt-1 w-0.5 flex-1 bg-slate-800" />}
      </View>
      <View
        className={`mb-5 flex-1 rounded-2xl border p-4 ${
          isActive
            ? 'border-indigo-500/50 bg-indigo-950/20'
            : 'border-slate-800/80 bg-slate-900/80'
        } ${muted ? 'opacity-70' : ''}`}
      >
        <Text className="text-xs font-semibold uppercase tracking-wider text-indigo-400">
          Tydzień {item.week}
        </Text>
        <Text className="mt-1 text-base font-bold text-slate-100">{item.title}</Text>
        <Text className="mt-1 text-sm leading-5 text-slate-400">{item.description}</Text>
        <Text className="mt-2.5 text-xs font-medium text-slate-500">{item.skills.join(' · ')}</Text>
      </View>
    </View>
  );
}

import { View, Text } from 'react-native';

import type { AgentStatus } from '@/types';

interface AgentStatusBadgeProps {
  status: AgentStatus;
}

const statusCopy: Record<AgentStatus, string> = {
  idle: 'Online',
  thinking: 'Analizuje profil',
  streaming: 'Pisze odpowiedź',
};

export function AgentStatusBadge({ status }: AgentStatusBadgeProps) {
  return (
    <View className="flex-row items-center gap-2 self-start rounded-full bg-success-50 px-3 py-1.5">
      <View className={`h-2 w-2 rounded-full ${status === 'idle' ? 'bg-success-600' : 'bg-warning-500'}`} />
      <Text className="text-xs font-semibold text-success-700">{statusCopy[status]}</Text>
    </View>
  );
}

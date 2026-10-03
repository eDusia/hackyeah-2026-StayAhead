import { Text, View } from 'react-native';

type BadgeVariant = 'default' | 'success' | 'warning' | 'info';

interface BadgeProps {
  label: string;
  variant?: BadgeVariant;
}

const badgeClass: Record<BadgeVariant, string> = {
  default: 'bg-slate-100',
  success: 'bg-success-50',
  warning: 'bg-warning-50',
  info: 'bg-primary-50',
};

const labelClass: Record<BadgeVariant, string> = {
  default: 'text-slate-600',
  success: 'text-success-700',
  warning: 'text-warning-600',
  info: 'text-primary-700',
};

export function Badge({ label, variant = 'default' }: BadgeProps) {
  return (
    <View className={`self-start rounded-full px-2.5 py-1 ${badgeClass[variant]}`}>
      <Text className={`text-xs font-semibold ${labelClass[variant]}`}>{label}</Text>
    </View>
  );
}
